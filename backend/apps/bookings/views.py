from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Booking, BookingStatus
from .serializers import BookingSerializer, BookingCreateSerializer
from apps.notifications.models import Notification, NotificationType

@extend_schema_view(
    list=extend_schema(summary="List user's bookings and rental requests"),
    create=extend_schema(summary="Create a new equipment booking request"),
    retrieve=extend_schema(summary="Retrieve booking details"),
)
class BookingViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "equipment"]

    def get_queryset(self):
        user = self.request.user
        role = self.request.query_params.get("role")
        if role == "renter":
            return Booking.objects.filter(renter=user).select_related("equipment", "renter", "equipment__owner")
        elif role == "owner":
            return Booking.objects.filter(equipment__owner=user).select_related("equipment", "renter", "equipment__owner")
        # Default: all bookings where user is either renter or equipment owner
        return Booking.objects.filter(
            Q(renter=user) | Q(equipment__owner=user)
        ).select_related("equipment", "renter", "equipment__owner")

    def get_serializer_class(self):
        if self.action == "create":
            return BookingCreateSerializer
        return BookingSerializer

    def perform_create(self, serializer):
        booking = serializer.save()
        # Create notification for the equipment owner
        Notification.objects.create(
            recipient=booking.equipment.owner,
            sender=self.request.user,
            notification_type=NotificationType.BOOKING_REQUESTED,
            title="New Rental Request Received",
            message=f"{self.request.user.get_full_name() or self.request.user.username} has requested to rent '{booking.equipment.name}' from {booking.start_date} to {booking.end_date}.",
            link=f"/bookings",
        )

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        """Equipment owner approves the booking."""
        booking = self.get_object()
        if booking.equipment.owner != request.user:
            return Response(
                {"error": "Only the equipment owner can approve this booking."},
                status=status.HTTP_403_FORBIDDEN,
            )
        if booking.status != BookingStatus.PENDING:
            return Response(
                {"error": f"Cannot approve a booking in status '{booking.status}'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking.status = BookingStatus.APPROVED
        booking.save()

        Notification.objects.create(
            recipient=booking.renter,
            sender=request.user,
            notification_type=NotificationType.BOOKING_APPROVED,
            title="Booking Approved!",
            message=f"Your booking request for '{booking.equipment.name}' has been approved.",
            link="/bookings",
        )

        return Response(BookingSerializer(booking, context={"request": request}).data)

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        """Equipment owner rejects the booking."""
        booking = self.get_object()
        if booking.equipment.owner != request.user:
            return Response(
                {"error": "Only the equipment owner can reject this booking."},
                status=status.HTTP_403_FORBIDDEN,
            )
        if booking.status != BookingStatus.PENDING:
            return Response(
                {"error": f"Cannot reject a booking in status '{booking.status}'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking.status = BookingStatus.REJECTED
        booking.save()

        Notification.objects.create(
            recipient=booking.renter,
            sender=request.user,
            notification_type=NotificationType.BOOKING_REJECTED,
            title="Booking Request Declined",
            message=f"Your booking request for '{booking.equipment.name}' was declined by the owner.",
            link="/bookings",
        )

        return Response(BookingSerializer(booking, context={"request": request}).data)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        """Renter or owner cancels the booking."""
        booking = self.get_object()
        if booking.renter != request.user and booking.equipment.owner != request.user:
            return Response(
                {"error": "You do not have permission to cancel this booking."},
                status=status.HTTP_403_FORBIDDEN,
            )
        if booking.status in [BookingStatus.CANCELLED, BookingStatus.COMPLETED]:
            return Response(
                {"error": f"Cannot cancel a booking that is already {booking.status}."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking.status = BookingStatus.CANCELLED
        booking.save()

        other_user = booking.equipment.owner if request.user == booking.renter else booking.renter
        Notification.objects.create(
            recipient=other_user,
            sender=request.user,
            notification_type=NotificationType.BOOKING_CANCELLED,
            title="Booking Cancelled",
            message=f"Booking #{booking.id} for '{booking.equipment.name}' was cancelled by {request.user.get_full_name() or request.user.username}.",
            link="/bookings",
        )

        return Response(BookingSerializer(booking, context={"request": request}).data)

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        """Mark booking as completed (e.g. equipment returned)."""
        booking = self.get_object()
        if booking.equipment.owner != request.user and booking.renter != request.user:
            return Response(
                {"error": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )
        if booking.status != BookingStatus.APPROVED:
            return Response(
                {"error": "Only approved bookings can be marked as completed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking.status = BookingStatus.COMPLETED
        booking.save()

        Notification.objects.create(
            recipient=booking.renter,
            sender=request.user,
            notification_type=NotificationType.BOOKING_COMPLETED,
            title="Rental Completed - Leave a Review",
            message=f"Your rental of '{booking.equipment.name}' is complete! Please rate your experience.",
            link=f"/equipment/{booking.equipment_id}",
        )

        return Response(BookingSerializer(booking, context={"request": request}).data)
