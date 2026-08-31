from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source="sender.get_full_name", read_only=True)

    class Meta:
        model = Notification
        fields = (
            "id",
            "recipient",
            "sender",
            "sender_name",
            "notification_type",
            "title",
            "message",
            "link",
            "is_read",
            "created_at",
        )
        read_only_fields = ("id", "recipient", "sender", "notification_type", "title", "message", "link", "created_at")
