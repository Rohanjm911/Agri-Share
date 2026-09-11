from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Category, Equipment, EquipmentImage
from .serializers import (
    CategorySerializer,
    EquipmentListSerializer,
    EquipmentDetailSerializer,
    EquipmentCreateUpdateSerializer,
    EquipmentImageSerializer,
)
from .filters import EquipmentFilter
from .permissions import IsOwnerOrReadOnly, IsAdminOrReadOnly, IsRegisteredOwner

@extend_schema_view(
    list=extend_schema(summary="List all categories", description="Returns active equipment categories."),
    create=extend_schema(summary="Create a new category (Admin only)"),
    retrieve=extend_schema(summary="Get category details"),
)
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "slug"

@extend_schema_view(
    list=extend_schema(summary="List and search equipment listings"),
    retrieve=extend_schema(summary="Get detailed equipment listing"),
    create=extend_schema(summary="Create a new equipment listing"),
    update=extend_schema(summary="Update an existing equipment listing (Owner only)"),
    destroy=extend_schema(summary="Delete an equipment listing (Owner only)"),
)
class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.select_related("category", "owner").prefetch_related("images", "reviews").all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = EquipmentFilter
    search_fields = ["name", "description", "brand", "model", "location"]
    ordering_fields = ["created_at", "price_per_day", "name"]
    ordering = ["-created_at"]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly, IsRegisteredOwner]

    def get_queryset(self):
        qs = super().get_queryset()
        # When browsing general equipment catalog (action == 'list'),
        # if user is authenticated and hasn't explicitly filtered by owner,
        # exclude their own equipment listings so they only see others' machinery to rent.
        if self.action == "list" and self.request.user.is_authenticated:
            # Check if user specifically requested a specific owner via query params
            owner_param = self.request.query_params.get("owner")
            include_mine = self.request.query_params.get("include_mine")
            if not owner_param and not include_mine:
                qs = qs.exclude(owner=self.request.user)
        return qs

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return EquipmentCreateUpdateSerializer
        if self.action == "retrieve":
            return EquipmentDetailSerializer
        return EquipmentListSerializer

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated])
    def my_equipment(self, request):
        """Returns listings created by the authenticated user."""
        user_equipment = self.queryset.filter(owner=request.user)
        page = self.paginate_queryset(user_equipment)
        if page is not None:
            serializer = EquipmentListSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)
        serializer = EquipmentListSerializer(user_equipment, many=True, context={"request": request})
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated, IsOwnerOrReadOnly])
    def upload_image(self, request, pk=None):
        """Upload a single image to the equipment gallery."""
        equipment = self.get_object()
        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"error": "Image file is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        is_primary = request.data.get("is_primary", "false").lower() in ("true", "1")
        image_obj = EquipmentImage.objects.create(
            equipment=equipment,
            image=image_file,
            is_primary=is_primary,
        )
        serializer = EquipmentImageSerializer(image_obj, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
