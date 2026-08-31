from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from apps.accounts.models import User

class AccountsAuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse("auth-register")
        self.login_url = reverse("auth-login")
        self.profile_url = reverse("auth-profile")
        self.change_password_url = reverse("auth-change-password")
        self.logout_url = reverse("auth-logout")

        self.user_data = {
            "username": "testfarmer",
            "email": "farmer@example.com",
            "first_name": "Test",
            "last_name": "Farmer",
            "phone_number": "+1234567890",
            "password": "Password123!",
            "password_confirm": "Password123!",
        }

    def test_user_registration_success(self):
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertIn("user", response.data)
        self.assertEqual(response.data["user"]["email"], "farmer@example.com")

    def test_user_registration_mismatched_password(self):
        invalid_data = self.user_data.copy()
        invalid_data["password_confirm"] = "DifferentPassword123!"
        response = self.client.post(self.register_url, invalid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_user_login_success(self):
        # Register user first
        User.objects.create_user(
            username="testfarmer",
            email="farmer@example.com",
            password="Password123!",
            first_name="Test",
            last_name="Farmer",
        )
        login_data = {
            "email": "farmer@example.com",
            "password": "Password123!",
        }
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(response.data["user"]["email"], "farmer@example.com")

    def test_authenticated_profile_access(self):
        user = User.objects.create_user(
            username="testfarmer",
            email="farmer@example.com",
            password="Password123!",
            first_name="Test",
            last_name="Farmer",
        )
        self.client.force_authenticate(user=user)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], user.email)

    def test_unauthenticated_profile_access_forbidden(self):
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
