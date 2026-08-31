import django_filters
from .models import Equipment, Category, EquipmentCondition, EquipmentStatus

class EquipmentFilter(django_filters.FilterSet):
    category = django_filters.ModelChoiceFilter(
        queryset=Category.objects.filter(is_active=True),
        field_name="category",
    )
    category_slug = django_filters.CharFilter(
        field_name="category__slug",
        lookup_expr="exact",
    )
    condition = django_filters.ChoiceFilter(
        choices=EquipmentCondition.choices,
    )
    status = django_filters.ChoiceFilter(
        choices=EquipmentStatus.choices,
    )
    is_available = django_filters.BooleanFilter()
    location = django_filters.CharFilter(
        field_name="location",
        lookup_expr="icontains",
    )
    brand = django_filters.CharFilter(
        field_name="brand",
        lookup_expr="icontains",
    )
    min_price = django_filters.NumberFilter(
        field_name="price_per_day",
        lookup_expr="gte",
    )
    max_price = django_filters.NumberFilter(
        field_name="price_per_day",
        lookup_expr="lte",
    )
    owner = django_filters.NumberFilter(
        field_name="owner_id",
    )

    class Meta:
        model = Equipment
        fields = [
            "category",
            "category_slug",
            "condition",
            "status",
            "is_available",
            "location",
            "brand",
            "min_price",
            "max_price",
            "owner",
        ]
