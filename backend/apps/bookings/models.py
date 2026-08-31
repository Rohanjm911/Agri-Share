from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone
from apps.equipment.models import Equipment

class BookingStatus(models.TextChoices):
    PENDING = "PENDING", "Pending Approval"
    APPROVED = "APPROVED", "Approved"
    REJECTED = "REJECTED", "Rejected"
    CANCELLED = "CANCELLED", "Cancelled"
    COMPLETED = "COMPLETED", "Completed"

class Booking(models.Model):
    """Rental booking request and contract for equipment."""
    equipment = models.ForeignKey(
        Equipment,
        on_delete=models.CASCADE,
        related_name="bookings",
    )
    renter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="bookings_made",
    )
    start_date = models.DateField(db_index=True)
    end_date = models.DateField(db_index=True)
    total_days = models.PositiveIntegerField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    security_deposit = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=20,
        choices=BookingStatus.choices,
        default=BookingStatus.PENDING,
        db_index=True,
    )
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"
        ordering = ["-created_at"]

    def clean(self):
        # 1. Start date & End date validation
        if self.start_date and self.end_date:
            if self.end_date < self.start_date:
                raise ValidationError("End date cannot be earlier than start date.")
            
            # 2. Prevent past bookings when creating new pending requests
            if not self.pk and self.status == BookingStatus.PENDING and self.start_date < timezone.now().date():
                raise ValidationError("Booking start date cannot be in the past.")

        # 3. Owner cannot rent own equipment
        if self.equipment_id and self.renter_id:
            if self.equipment.owner_id == self.renter_id:
                raise ValidationError("You cannot rent your own equipment.")

        # 4. Check for overlapping approved bookings
        if self.equipment_id and self.start_date and self.end_date and self.status in [BookingStatus.APPROVED, BookingStatus.PENDING]:
            overlapping = Booking.objects.filter(
                equipment=self.equipment,
                status=BookingStatus.APPROVED,
                start_date__lte=self.end_date,
                end_date__gte=self.start_date,
            )
            if self.pk:
                overlapping = overlapping.exclude(pk=self.pk)
            if overlapping.exists() and self.status == BookingStatus.APPROVED:
                raise ValidationError("This equipment already has an approved booking during the selected dates.")

    def save(self, *args, **kwargs):
        # Always compute total days and total amount server-side from equipment price
        if self.start_date and self.end_date:
            days = (self.end_date - self.start_date).days + 1
            self.total_days = max(days, 1)
        if self.equipment:
            self.price_per_day = self.equipment.price_per_day
            self.security_deposit = self.equipment.security_deposit
            self.total_amount = (self.price_per_day * self.total_days) + self.security_deposit
        
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking #{self.id}: {self.equipment.name} by {self.renter.email} ({self.status})"
