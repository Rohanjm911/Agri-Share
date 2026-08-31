from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "equipment", "reviewer", "rating", "created_at")
    list_filter = ("rating", "created_at")
    search_fields = (
        "equipment__name",
        "reviewer__email",
        "reviewer__username",
        "comment",
    )
    readonly_fields = ("created_at", "updated_at")
