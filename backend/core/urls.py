from django.urls import path
from .views import CreateSadgegrdzelo

urlpatterns = [
    path('create/', CreateSadgegrdzelo.as_view(), name="create_sadgegrdzelo")
]