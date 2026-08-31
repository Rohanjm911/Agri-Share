from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from apps.accounts.models import User
from apps.notifications.models import Notification, NotificationType

class NotificationAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="notify_user",
            email="notify@example.com",
            password="Password123!",
        )
        self.notification = Notification.objects.create(
            recipient=self.user,
            notification_type=NotificationType.SYSTEM,
            title="Welcome to AgriShare",
            message="Your account is active.",
        )
        self.list_url = reverse("notification-list")
        self.unread_url = reverse("notification-unread-count")
        self.mark_all_url = reverse("notification-mark-all-read")

    def test_get_notifications(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check paginated count or results
        count = response.data.get("count", len(response.data))
        self.assertEqual(count, 1)

    def test_unread_count(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.unread_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["unread_count"], 1)

    def test_mark_all_read(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.mark_all_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.notification.refresh_from_db()
        self.assertTrue(self.notification.is_read)
