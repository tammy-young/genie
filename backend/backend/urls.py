from django.contrib import admin
from django.urls import include, path
from genie.views import get_csrf_token


app_name = "genie"


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls', namespace='api')),
    path('csrf-token/', get_csrf_token),
]
