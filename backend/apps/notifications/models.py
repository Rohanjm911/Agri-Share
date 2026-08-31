from django.db import models
from django.conf import settings

class NotificationType(models.TextChoices):
    BOOKING_REQUESTED = "BOOKING_REQUESTED", "Booking Request Received"
    BOOKING_APPROVED = "BOOKING_APPROVED", "Booking Approved"
    BOOKING_REJECTED = "BOOKING_REJECTED", "Booking Rejected"
    BOOKING_CANCELLED = "BOOKING_CANCELLED", "Booking Cancelled"
    BOOKING_COMPLETED = "BOOKING_COMPLETED", "Booking Completed"
    REVIEW_RECEIVED = "REVIEW_RECEIVED", "New Review Received"
    SYSTEM = "SYSTEM", "System Notification"

class Notification(models.Model):
    """In-app notifications for users."""
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications",
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="sent_notifications",
    )
    notification_type = models.CharField(
        max_length=30,
        choices=NotificationType.choices,
        default=NotificationType.SYSTEM,
    )
    title = models.CharField(max_length=255)
    message = models.TextField()
    link = models.CharField(max_length=255, blank=True, default="")
    is_read = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Notification to {self.recipient.email}: {self.title}"
