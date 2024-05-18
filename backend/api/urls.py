from django.urls import path
from .views import SearchView


app_name = "api"


urlpatterns = [
    path('search/', SearchView.as_view()),
]