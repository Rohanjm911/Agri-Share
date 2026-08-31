from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "equipment",
        "renter",
        "start_date",
        "end_date",
        "total_days",
        "total_amount",
        "status",
        "created_at",
    )
    list_filter = ("status", "start_date", "end_date", "created_at")
    search_fields = (
        "equipment__name",
        "equipment__brand",
        "renter__email",
        "renter__username",
        "renter__first_name",
        "renter__last_name",
    )
    readonly_fields = ("price_per_day", "total_amount", "security_deposit", "created_at", "updated_at")
