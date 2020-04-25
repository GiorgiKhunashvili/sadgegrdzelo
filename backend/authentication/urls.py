from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views as auth_views

urlpatterns = [
    path('hello/', auth_views.HelloWorldView.as_view(), name="hello_world"),
    path('user/create/', auth_views.UserAccountCreate.as_view(), name="user_create"),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', auth_views.LogoutAndBlacklistRefreshTokenForUserView.as_view(), name="blacklist")
]