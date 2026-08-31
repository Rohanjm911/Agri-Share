from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from apps.accounts.models import User
from apps.equipment.models import Category, Equipment, EquipmentCondition, EquipmentStatus
from apps.bookings.models import Booking, BookingStatus

class BookingAPITests(APITestCase):
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
        self.category = Category.objects.create(name="Tractors", slug="tractors")
        self.equipment = Equipment.objects.create(
            owner=self.owner,
            category=self.category,
            name="John Deere 5075E",
            brand="John Deere",
            model="5075E",
            manufacturing_year=2021,
            condition=EquipmentCondition.EXCELLENT,
            price_per_day=200.00,
            security_deposit=500.00,
            location="Ames, Iowa",
            is_available=True,
            status=EquipmentStatus.AVAILABLE,
            description="Great utility tractor.",
        )
        self.booking_url = reverse("booking-list")

    def test_renter_can_create_booking(self):
        self.client.force_authenticate(user=self.renter)
        start = timezone.now().date() + timedelta(days=2)
        end = timezone.now().date() + timedelta(days=5) # 4 days
        data = {
            "equipment": self.equipment.id,
            "start_date": str(start),
            "end_date": str(end),
            "notes": "Field prep",
        }
        response = self.client.post(self.booking_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        booking = Booking.objects.get(id=response.data["id"])
        self.assertEqual(booking.total_days, 4)
        self.assertEqual(booking.price_per_day, 200.00)
        # total_amount = (4 * 200) + 500 = 1300.00
        self.assertEqual(booking.total_amount, 1300.00)
        self.assertEqual(booking.status, BookingStatus.PENDING)

    def test_owner_cannot_rent_own_equipment(self):
        self.client.force_authenticate(user=self.owner)
        start = timezone.now().date() + timedelta(days=2)
        end = timezone.now().date() + timedelta(days=5)
        data = {
            "equipment": self.equipment.id,
            "start_date": str(start),
            "end_date": str(end),
        }
        response = self.client.post(self.booking_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_owner_can_approve_booking(self):
        start = timezone.now().date() + timedelta(days=2)
        end = timezone.now().date() + timedelta(days=4)
        booking = Booking.objects.create(
            equipment=self.equipment,
            renter=self.renter,
            start_date=start,
            end_date=end,
            status=BookingStatus.PENDING,
        )
        self.client.force_authenticate(user=self.owner)
        approve_url = reverse("booking-approve", kwargs={"pk": booking.id})
        response = self.client.post(approve_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        booking.refresh_from_db()
        self.assertEqual(booking.status, BookingStatus.APPROVED)
