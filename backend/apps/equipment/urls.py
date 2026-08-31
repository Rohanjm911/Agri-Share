from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, EquipmentViewSet

router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"", EquipmentViewSet, basename="equipment")

urlpatterns = [
    path("", include(router.urls)),
]
