from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from apps.accounts.models import User

class DashboardAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="dash_user",
            email="dash@example.com",
            password="Password123!",
        )
        self.stats_url = reverse("dashboard-stats")
        self.overview_url = reverse("dashboard-overview")

    def test_dashboard_stats_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.stats_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("owner_metrics", response.data)
        self.assertIn("renter_metrics", response.data)
        self.assertIn("unread_notifications", response.data)

    def test_dashboard_stats_unauthenticated_forbidden(self):
        response = self.client.get(self.stats_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
