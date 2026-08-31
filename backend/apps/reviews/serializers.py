from rest_framework import serializers
from apps.accounts.serializers import UserSerializer
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)
    equipment_name = serializers.CharField(source="equipment.name", read_only=True)

    class Meta:
        model = Review
        fields = (
            "id",
            "booking",
            "reviewer",
            "equipment",
            "equipment_name",
            "rating",
            "comment",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "equipment", "created_at", "updated_at")

    def validate(self, attrs):
        request = self.context.get("request")
        booking = attrs.get("booking")
        if booking:
            from apps.bookings.models import BookingStatus
            if booking.status != BookingStatus.COMPLETED:
                raise serializers.ValidationError({"booking": "You can only review completed bookings."})
            if request and booking.renter_id != request.user.id:
                raise serializers.ValidationError({"booking": "Only the renter who completed this booking can leave a review."})
            if request and booking.equipment.owner_id == request.user.id:
                raise serializers.ValidationError({"booking": "You cannot review your own equipment."})
            if hasattr(booking, "review") and not self.instance:
                raise serializers.ValidationError({"booking": "A review has already been submitted for this booking."})
        return attrs

    def create(self, validated_data):
        request = self.context.get("request")
        booking = validated_data["booking"]
        validated_data["reviewer"] = request.user
        validated_data["equipment"] = booking.equipment
        return super().create(validated_data)
