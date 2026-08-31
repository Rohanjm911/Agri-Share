from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Sum, Count, Q
from drf_spectacular.utils import extend_schema

from apps.equipment.models import Equipment, EquipmentStatus
from apps.bookings.models import Booking, BookingStatus
from apps.reviews.models import Review
from apps.notifications.models import Notification
from apps.equipment.serializers import EquipmentListSerializer
from apps.bookings.serializers import BookingSerializer

class DashboardStatsView(APIView):
    """Aggregated statistics for current user."""
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(summary="Get user dashboard statistics")
    def get(self, request):
        user = request.user

        # Owner metrics
        owned_equipment = Equipment.objects.filter(owner=user)
        total_equipment = owned_equipment.count()
        active_listings = owned_equipment.filter(status=EquipmentStatus.AVAILABLE, is_available=True).count()

        owner_bookings = Booking.objects.filter(equipment__owner=user)
        incoming_pending_requests = owner_bookings.filter(status=BookingStatus.PENDING).count()
        owner_completed_rentals = owner_bookings.filter(status=BookingStatus.COMPLETED).count()
        
        # Revenue calculation from completed / approved bookings for owner
        total_earnings = owner_bookings.filter(
            status__in=[BookingStatus.APPROVED, BookingStatus.COMPLETED]
        ).aggregate(total=Sum("total_amount"))["total"] or 0.00

        # Renter metrics
        renter_bookings = Booking.objects.filter(renter=user)
        my_total_bookings = renter_bookings.count()
        my_pending_bookings = renter_bookings.filter(status=BookingStatus.PENDING).count()
        my_approved_bookings = renter_bookings.filter(status=BookingStatus.APPROVED).count()
        my_completed_bookings = renter_bookings.filter(status=BookingStatus.COMPLETED).count()
        
        total_spent = renter_bookings.filter(
            status__in=[BookingStatus.APPROVED, BookingStatus.COMPLETED]
        ).aggregate(total=Sum("total_amount"))["total"] or 0.00

        # Reviews received on owned equipment
        reviews_received = Review.objects.filter(equipment__owner=user)
        total_reviews_received = reviews_received.count()
        avg_owner_rating = 0.0
        if total_reviews_received > 0:
            avg_owner_rating = round(sum(r.rating for r in reviews_received) / total_reviews_received, 1)

        # Unread notifications
        unread_notifications = Notification.objects.filter(recipient=user, is_read=False).count()

        return Response({
            "owner_metrics": {
                "total_equipment": total_equipment,
                "active_listings": active_listings,
                "incoming_pending_requests": incoming_pending_requests,
                "completed_rentals": owner_completed_rentals,
                "total_earnings": float(total_earnings),
                "total_reviews_received": total_reviews_received,
                "average_rating": avg_owner_rating,
            },
            "renter_metrics": {
                "total_bookings": my_total_bookings,
                "pending_bookings": my_pending_bookings,
                "approved_bookings": my_approved_bookings,
                "completed_bookings": my_completed_bookings,
                "total_spent": float(total_spent),
            },
            "unread_notifications": unread_notifications,
        })

class DashboardOverviewView(APIView):
    """Recent activity overview for user dashboard."""
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(summary="Get recent activity overview")
    def get(self, request):
        user = request.user
        
        # Recent listings
        recent_equipment = Equipment.objects.filter(owner=user).order_by("-created_at")[:5]
        # Recent incoming requests
        recent_requests = Booking.objects.filter(equipment__owner=user).select_related("equipment", "renter").order_by("-created_at")[:5]
        # Recent bookings made
        recent_bookings = Booking.objects.filter(renter=user).select_related("equipment", "renter").order_by("-created_at")[:5]

        return Response({
            "recent_equipment": EquipmentListSerializer(recent_equipment, many=True, context={"request": request}).data,
            "recent_requests": BookingSerializer(recent_requests, many=True, context={"request": request}).data,
            "recent_bookings": BookingSerializer(recent_bookings, many=True, context={"request": request}).data,
        })
