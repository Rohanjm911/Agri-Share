from rest_framework import serializers
# pyrefly: ignore [missing-import]
from apps.accounts.serializers import UserSerializer
# pyrefly: ignore [missing-import]
from apps.equipment.serializers import EquipmentListSerializer
from .models import Booking, BookingStatus

class BookingSerializer(serializers.ModelSerializer):
    renter = UserSerializer(read_only=True)
    equipment_detail = EquipmentListSerializer(source="equipment", read_only=True)
    owner_email = serializers.EmailField(source="equipment.owner.email", read_only=True)
    owner_name = serializers.CharField(source="equipment.owner.get_full_name", read_only=True)
    can_review = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = (
            "id",
            "equipment",
            "equipment_detail",
            "renter",
            "owner_name",
            "owner_email",
            "start_date",
            "end_date",
            "total_days",
            "price_per_day",
            "security_deposit",
            "total_amount",
            "status",
            "notes",
            "can_review",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "total_days",
            "price_per_day",
            "security_deposit",
            "total_amount",
            "status",
            "created_at",
            "updated_at",
        )

    def get_can_review(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        # Can review if status is COMPLETED, user is renter, and no review exists yet
        return (
            obj.status == BookingStatus.COMPLETED
            and obj.renter_id == request.user.id
            and not hasattr(obj, "review")
        )

from django.utils import timezone
from django.core.exceptions import ValidationError as DjangoValidationError

class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ("id", "equipment", "start_date", "end_date", "notes")
        read_only_fields = ("id",)

    def validate(self, attrs):
        request = self.context.get("request")
        equipment = attrs.get("equipment")
        start_date = attrs.get("start_date")
        end_date = attrs.get("end_date")

        # 1. Owner cannot rent own equipment
        if equipment and request and equipment.owner_id == request.user.id:
            raise serializers.ValidationError({"equipment": "You cannot book your own equipment."})

        # 2. Start & End date validations
        if start_date and end_date:
            if end_date < start_date:
                raise serializers.ValidationError({"end_date": "End date cannot be earlier than start date."})
            if start_date < timezone.now().date():
                raise serializers.ValidationError({"start_date": "Booking start date cannot be in the past."})

        # 3. Check for overlapping approved bookings
        if equipment and start_date and end_date:
            has_overlap = Booking.objects.filter(
                equipment=equipment,
                status=BookingStatus.APPROVED,
                start_date__lte=end_date,
                end_date__gte=start_date,
            ).exists()
            if has_overlap:
                raise serializers.ValidationError({
                    "non_field_errors": "This equipment already has an approved booking during the selected dates."
                })

        return attrs

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["renter"] = request.user
        try:
            return super().create(validated_data)
        except DjangoValidationError as exc:
            if hasattr(exc, "message_dict"):
                raise serializers.ValidationError(exc.message_dict)
            raise serializers.ValidationError(exc.messages)

