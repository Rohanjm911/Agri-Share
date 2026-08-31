from django.contrib.auth.models import AbstractUser
from django.db import models

def user_profile_image_path(instance, filename):
    """Generate path for user profile images."""
    return f"profiles/user_{instance.id}/{filename}"

class User(AbstractUser):
    """
    Custom User model for AgriShare platform.
    Email is unique and required.
    """
    email = models.EmailField(
        unique=True,
        verbose_name="Email Address",
        help_text="Required. Must be a valid and unique email address.",
    )
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        verbose_name="Phone Number",
        help_text="Contact phone number for rental inquiries and coordination.",
    )
    profile_image = models.ImageField(
        upload_to=user_profile_image_path,
        blank=True,
        null=True,
        verbose_name="Profile Image",
    )
    bio = models.TextField(
        blank=True,
        null=True,
        verbose_name="Biography",
        help_text="Short bio about the farmer or equipment owner.",
    )
    location = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Location / Region",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.email})"
