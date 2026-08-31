from rest_framework import serializers
from apps.accounts.serializers import UserSerializer
from .models import Category, Equipment, EquipmentImage

class CategorySerializer(serializers.ModelSerializer):
    equipment_count = serializers.IntegerField(source="equipment.count", read_only=True)

    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "icon",
            "is_active",
            "equipment_count",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "slug", "created_at", "updated_at")

class EquipmentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentImage
        fields = ("id", "equipment", "image", "is_primary", "created_at")
        read_only_fields = ("id", "created_at")

class EquipmentListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)
    primary_image = serializers.SerializerMethodField()
    owner_name = serializers.CharField(source="owner.get_full_name", read_only=True)
    owner_id = serializers.IntegerField(source="owner.id", read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    total_reviews = serializers.IntegerField(read_only=True)

    class Meta:
        model = Equipment
        fields = (
            "id",
            "name",
            "slug",
            "brand",
            "model",
            "category",
            "category_name",
            "category_slug",
            "price_per_day",
            "security_deposit",
            "condition",
            "status",
            "is_available",
            "location",
            "primary_image",
            "owner_name",
            "owner_id",
            "average_rating",
            "total_reviews",
            "created_at",
        )

    def get_primary_image(self, obj):
        url = obj.primary_image_url
        if url:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(url)
            return url
        return None

class EquipmentDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = EquipmentImageSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    total_reviews = serializers.IntegerField(read_only=True)

    class Meta:
        model = Equipment
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "brand",
            "model",
            "manufacturing_year",
            "condition",
            "price_per_day",
            "security_deposit",
            "location",
            "is_available",
            "status",
            "category",
            "owner",
            "images",
            "average_rating",
            "total_reviews",
            "created_at",
            "updated_at",
        )

class EquipmentCreateUpdateSerializer(serializers.ModelSerializer):
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Equipment
        fields = (
            "id",
            "name",
            "category",
            "description",
            "brand",
            "model",
            "manufacturing_year",
            "condition",
            "price_per_day",
            "security_deposit",
            "location",
            "is_available",
            "status",
            "uploaded_images",
            "slug",
            "created_at",
        )
        read_only_fields = ("id", "slug", "created_at")

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images", [])
        # Assign current authenticated user as owner
        request = self.context.get("request")
        validated_data["owner"] = request.user
        
        equipment = Equipment.objects.create(**validated_data)
        
        # Save any initial images
        for idx, img in enumerate(uploaded_images):
            EquipmentImage.objects.create(
                equipment=equipment,
                image=img,
                is_primary=(idx == 0),
            )
        return equipment

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop("uploaded_images", [])
        equipment = super().update(instance, validated_data)

        for img in uploaded_images:
            EquipmentImage.objects.create(
                equipment=equipment,
                image=img,
                is_primary=False,
            )
        return equipment
