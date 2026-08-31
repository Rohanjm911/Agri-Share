from django.db import models
from django.conf import settings
from django.utils.text import slugify

def equipment_image_path(instance, filename):
    """Generate upload path for equipment gallery images."""
    return f"equipment/eq_{instance.equipment_id}/{filename}"

class Category(models.Model):
    """Agricultural equipment category (e.g. Tractors, Harvesters, Tillage, Irrigation)."""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True, default="")
    icon = models.CharField(
        max_length=50,
        blank=True,
        default="tractor",
        help_text="Lucide or icon name representing this category",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class EquipmentCondition(models.TextChoices):
    NEW = "NEW", "New"
    EXCELLENT = "EXCELLENT", "Excellent"
    GOOD = "GOOD", "Good"
    FAIR = "FAIR", "Fair"

class EquipmentStatus(models.TextChoices):
    AVAILABLE = "AVAILABLE", "Available"
    RENTED = "RENTED", "Rented"
    MAINTENANCE = "MAINTENANCE", "Under Maintenance"
    INACTIVE = "INACTIVE", "Inactive"

class Equipment(models.Model):
    """Agricultural equipment listing available for rent."""
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="equipment_listings",
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="equipment",
    )
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=240, unique=True, blank=True)
    description = models.TextField()
    brand = models.CharField(max_length=100, db_index=True)
    model = models.CharField(max_length=100, db_index=True)
    manufacturing_year = models.PositiveIntegerField(
        help_text="Year the equipment was manufactured"
    )
    condition = models.CharField(
        max_length=20,
        choices=EquipmentCondition.choices,
        default=EquipmentCondition.GOOD,
    )
    price_per_day = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Rental rate per calendar day ($)",
    )
    security_deposit = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        help_text="Refundable deposit amount ($)",
    )
    location = models.CharField(
        max_length=255,
        db_index=True,
        help_text="City, State, or County where equipment is located",
    )
    is_available = models.BooleanField(default=True, db_index=True)
    status = models.CharField(
        max_length=20,
        choices=EquipmentStatus.choices,
        default=EquipmentStatus.AVAILABLE,
        db_index=True,
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Equipment"
        verbose_name_plural = "Equipment"
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(f"{self.brand}-{self.name}")
            slug_candidate = base_slug
            counter = 1
            while Equipment.objects.filter(slug=slug_candidate).exclude(pk=self.pk).exists():
                slug_candidate = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug_candidate
        super().save(*args, **kwargs)

    @property
    def primary_image_url(self):
        """Returns primary image URL or first available image URL."""
        primary = self.images.filter(is_primary=True).first()
        if primary and primary.image:
            return primary.image.url
        first = self.images.first()
        if first and first.image:
            return first.image.url
        return None

    @property
    def average_rating(self):
        """Calculate average rating from approved reviews."""
        reviews = self.reviews.all()
        if not reviews.exists():
            return 0.0
        total = sum(r.rating for r in reviews)
        return round(total / reviews.count(), 1)

    @property
    def total_reviews(self):
        return self.reviews.count()

    def __str__(self):
        return f"{self.name} ({self.brand} {self.model}) - ${self.price_per_day}/day"

class EquipmentImage(models.Model):
    """Gallery images for an equipment listing."""
    equipment = models.ForeignKey(
        Equipment,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image = models.ImageField(upload_to=equipment_image_path)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Equipment Image"
        verbose_name_plural = "Equipment Images"
        ordering = ["-is_primary", "-created_at"]

    def save(self, *args, **kwargs):
        # If this image is primary, unmark others for the same equipment
        if self.is_primary:
            EquipmentImage.objects.filter(
                equipment=self.equipment, is_primary=True
            ).exclude(pk=self.pk).update(is_primary=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Image #{self.id} for {self.equipment.name} (Primary: {self.is_primary})"
