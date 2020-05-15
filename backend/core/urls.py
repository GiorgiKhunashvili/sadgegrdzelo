from django.urls import path
from .views import CreateSadgegrdzelo, GetAllSadgegrdzelo

urlpatterns = [
    path('create/', CreateSadgegrdzelo.as_view(), name="create_sadgegrdzelo"),
    path('all-sadgegrdzelo/', GetAllSadgegrdzelo.as_view(), name="all_sadgegrdzelo")
]