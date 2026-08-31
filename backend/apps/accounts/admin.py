from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = (
        "id",
        "email",
        "username",
        "first_name",
        "last_name",
        "phone_number",
        "is_staff",
        "is_active",
        "created_at",
    )
    list_filter = ("is_staff", "is_active", "is_superuser")
    search_fields = ("email", "username", "first_name", "last_name", "phone_number")
    ordering = ("-created_at",)
    
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal Info",
            {
                "fields": (
                    "username",
                    "first_name",
                    "last_name",
                    "phone_number",
                    "profile_image",
                    "bio",
                    "location",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined", "created_at", "updated_at")}),
    )
    readonly_fields = ("created_at", "updated_at", "date_joined", "last_login")
