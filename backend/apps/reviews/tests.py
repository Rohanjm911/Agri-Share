from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from apps.accounts.models import User
from apps.equipment.models import Category, Equipment, EquipmentCondition, EquipmentStatus
from apps.bookings.models import Booking, BookingStatus
from apps.reviews.models import Review

class ReviewAPITests(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(
            username="owner_user",
            email="owner@example.com",
            password="Password123!",
        )
        self.renter = User.objects.create_user(
            username="renter_user",
            email="renter@example.com",
            password="Password123!",
        )
        self.other_user = User.objects.create_user(
            username="other_user",
            email="other@example.com",
            password="Password123!",
        )
        self.category = Category.objects.create(name="Tractors", slug="tractors")
        self.equipment = Equipment.objects.create(
            owner=self.owner,
            category=self.category,
            name="John Deere 5075E",
            brand="John Deere",
            model="5075E",
            manufacturing_year=2021,
            price_per_day=200.00,
            location="Ames, Iowa",
            description="Great utility tractor.",
        )
        self.completed_booking = Booking.objects.create(
            equipment=self.equipment,
            renter=self.renter,
            start_date=timezone.now().date() - timedelta(days=5),
            end_date=timezone.now().date() - timedelta(days=2),
            status=BookingStatus.COMPLETED,
        )
        self.reviews_url = reverse("review-list")

    def test_renter_can_review_completed_booking(self):
        self.client.force_authenticate(user=self.renter)
        data = {
            "booking": self.completed_booking.id,
            "rating": 5,
            "comment": "Exceptional equipment and smooth rental process!",
        }
        response = self.client.post(self.reviews_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 1)
        self.assertEqual(self.equipment.average_rating, 5.0)

    def test_non_renter_cannot_review_booking(self):
        self.client.force_authenticate(user=self.other_user)
        data = {
            "booking": self.completed_booking.id,
            "rating": 4,
            "comment": "Fraudulent review attempt",
        }
        response = self.client.post(self.reviews_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
