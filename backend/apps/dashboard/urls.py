from django.urls import path
from .views import DashboardStatsView, DashboardOverviewView

urlpatterns = [
    path("stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("overview/", DashboardOverviewView.as_view(), name="dashboard-overview"),
]
