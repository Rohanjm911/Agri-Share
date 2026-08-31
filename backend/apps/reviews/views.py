from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Review
from .serializers import ReviewSerializer
from apps.equipment.permissions import IsOwnerOrReadOnly
from apps.notifications.models import Notification, NotificationType

class IsReviewerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.reviewer == request.user

@extend_schema_view(
    list=extend_schema(summary="List reviews for equipment"),
    create=extend_schema(summary="Submit a review for a completed booking"),
)
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.select_related("reviewer", "equipment", "booking").all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsReviewerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["equipment", "reviewer", "rating"]
    ordering_fields = ["created_at", "rating"]
    ordering = ["-created_at"]

    def perform_create(self, serializer):
        review = serializer.save()
        # Notify equipment owner
        Notification.objects.create(
            recipient=review.equipment.owner,
            sender=self.request.user,
            notification_type=NotificationType.REVIEW_RECEIVED,
            title=f"New {review.rating}★ Review Received",
            message=f"{self.request.user.get_full_name() or self.request.user.username} left a {review.rating}-star review on '{review.equipment.name}': \"{review.comment[:60]}...\"",
            link=f"/equipment/{review.equipment_id}",
        )
