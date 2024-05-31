from django.urls import path
from .views import SearchView, BrandsView


app_name = "api"


urlpatterns = [
    path('search/', SearchView.as_view()),
    path('getBrands/', BrandsView.as_view())
]
