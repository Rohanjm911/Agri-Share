from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    # Admin Interface
    path("admin/", admin.site.urls),

    # API Documentation via drf-spectacular
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

    # Application API Endpoints
    path("api/auth/", include("apps.accounts.urls")),
    path("api/equipment/", include("apps.equipment.urls")),
    path("api/bookings/", include("apps.bookings.urls")),
    path("api/reviews/", include("apps.reviews.urls")),
    path("api/notifications/", include("apps.notifications.urls")),
    path("api/dashboard/", include("apps.dashboard.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
