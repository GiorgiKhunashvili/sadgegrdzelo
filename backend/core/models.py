from django.db import models
from authentication.models import UserAccount
# Create your models here.

class Sadgegrdzelo(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()
    audio = models.FileField(upload_to="audio")
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

    def __str__(self):
        return self.title