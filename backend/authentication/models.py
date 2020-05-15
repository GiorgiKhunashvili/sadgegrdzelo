from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# Create your models here.


class UserAccountManager(BaseUserManager):
    """ Creating Manager for our custom database """
    def create_user(self, email, username, password=None):
        """ this function creates user and saves in database """
        if not email:
            raise ValueError("users must have email!")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, username, password):
        """ creating super user """
        user = self.create_user(email, username, password)
        user.is_active = True
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    profile_image = models.ImageField(upload_to="profile_images", default="default.png", blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserAccountManager()

    def get_full_name(self):
        """ geting full name for django """
        return self.username

    def get_short_name(self):
        """ geting short name for django """
        return self.username
    
    def __str__(self):
        """"string representation"""
        return self.email