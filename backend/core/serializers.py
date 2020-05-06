from rest_framework import serializers
from .models import Sadgegrdzelo
from authentication.models import UserAccount

class SadgegrdzeloSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Sadgegrdzelo
        fields = ['title', "description", "audio"]

    def save(self):
        try:
            author = UserAccount.objects.get(id=self.validated_data["id"])
            sadgegrdzelo = Sadgegrdzelo(
                title=self.validated_data['title'],
                description=self.validated_data['description'],
                audio=self.validated_data['audio'],
                user=author
            )
        except UserAccount.DoesNotExist as e:
            raise serializers.ValidationError(e)

