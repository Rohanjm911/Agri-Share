from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from apps.equipment.models import Equipment
from apps.bookings.models import Booking, BookingStatus

class Review(models.Model):
    """Review and star rating left by a renter for a completed rental."""
    booking = models.OneToOneField(
        Booking,
        on_delete=models.CASCADE,
        related_name="review",
        help_text="The completed booking being reviewed",
    )
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reviews_given",
    )
    equipment = models.ForeignKey(
        Equipment,
        on_delete=models.CASCADE,
        related_name="reviews",
    )
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Star rating from 1 to 5",
    )
    comment = models.TextField(
        help_text="Detailed feedback and review comment",
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"
        ordering = ["-created_at"]

    def clean(self):
        if self.booking_id:
            # 1. Booking must be COMPLETED
            if self.booking.status != BookingStatus.COMPLETED:
                raise ValidationError("You can only review equipment after completing the rental booking.")
            
            # 2. Reviewer must be the renter
            if self.reviewer_id and self.booking.renter_id != self.reviewer_id:
                raise ValidationError("Only the renter who booked this equipment can leave a review.")
            
            # 3. Equipment must match booking equipment
            if self.equipment_id and self.booking.equipment_id != self.equipment_id:
                raise ValidationError("The equipment does not match the booking.")

        # 4. Cannot review own equipment
        if self.equipment_id and self.reviewer_id:
            if self.equipment.owner_id == self.reviewer_id:
                raise ValidationError("You cannot review your own equipment.")

    def save(self, *args, **kwargs):
        if self.booking:
            self.equipment = self.booking.equipment
            self.reviewer = self.booking.renter
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Review ({self.rating}★) by {self.reviewer.username} on {self.equipment.name}"
