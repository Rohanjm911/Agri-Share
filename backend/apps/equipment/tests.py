from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from apps.accounts.models import User
from apps.equipment.models import Category, Equipment, EquipmentCondition, EquipmentStatus

class EquipmentAPITests(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(
            username="owner_user",
            email="owner@example.com",
            password="Password123!",
        )
        self.other_user = User.objects.create_user(
            username="other_user",
            email="other@example.com",
            password="Password123!",
        )
        self.category = Category.objects.create(
            name="Tractors",
            slug="tractors",
            description="Tractors category",
        )
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
        self.list_url = reverse("equipment-list")
        self.detail_url = reverse("equipment-detail", kwargs={"pk": self.equipment.id})

    def test_public_can_view_equipment_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

    def test_filter_equipment_by_brand(self):
        response = self.client.get(f"{self.list_url}?brand=John")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

        response2 = self.client.get(f"{self.list_url}?brand=Kubota")
        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        self.assertEqual(response2.data["count"], 0)

    def test_owner_can_update_equipment(self):
        self.client.force_authenticate(user=self.owner)
        update_data = {
            "name": "John Deere 5075E Updated",
            "category": self.category.id,
            "brand": "John Deere",
            "model": "5075E",
            "manufacturing_year": 2021,
            "condition": EquipmentCondition.EXCELLENT,
            "price_per_day": "220.00",
            "security_deposit": "500.00",
            "location": "Ames, Iowa",
            "description": "Updated description",
            "is_available": True,
            "status": EquipmentStatus.AVAILABLE,
        }
        response = self.client.put(self.detail_url, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.equipment.refresh_from_db()
        self.assertEqual(self.equipment.name, "John Deere 5075E Updated")

    def test_non_owner_cannot_update_equipment(self):
        self.client.force_authenticate(user=self.other_user)
        update_data = {
            "name": "Hacked Equipment Name",
            "category": self.category.id,
            "brand": "John Deere",
            "model": "5075E",
            "manufacturing_year": 2021,
            "price_per_day": "10.00",
            "location": "Ames, Iowa",
            "description": "Unauthorized change",
        }
        response = self.client.put(self.detail_url, update_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
