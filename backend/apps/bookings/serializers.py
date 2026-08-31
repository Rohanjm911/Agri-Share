from rest_framework import serializers
from apps.accounts.serializers import UserSerializer
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

class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ("id", "equipment", "start_date", "end_date", "notes")
        read_only_fields = ("id",)

    def validate(self, attrs):
        request = self.context.get("request")
        equipment = attrs.get("equipment")
        if equipment and request and equipment.owner_id == request.user.id:
            raise serializers.ValidationError("You cannot book your own equipment.")
        return attrs

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["renter"] = request.user
        return super().create(validated_data)
