from django.contrib import admin
from .models import Category, Equipment, EquipmentImage

class EquipmentImageInline(admin.TabularInline):
    model = EquipmentImage
    extra = 1
    fields = ("image", "is_primary", "created_at")
    readonly_fields = ("created_at",)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "slug", "icon", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "brand",
        "model",
        "category",
        "owner",
        "price_per_day",
        "condition",
        "status",
        "is_available",
        "location",
        "created_at",
    )
    list_filter = ("category", "condition", "status", "is_available", "created_at")
    search_fields = ("name", "brand", "model", "description", "location", "owner__email", "owner__username")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [EquipmentImageInline]
    readonly_fields = ("created_at", "updated_at")

@admin.register(EquipmentImage)
class EquipmentImageAdmin(admin.ModelAdmin):
    list_display = ("id", "equipment", "is_primary", "created_at")
    list_filter = ("is_primary", "created_at")
