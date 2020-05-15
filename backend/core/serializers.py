from rest_framework import serializers
from .models import Sadgegrdzelo
from authentication.models import UserAccount

class SadgegrdzeloSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Sadgegrdzelo
        fields = ["id", 'title', "description", "audio"]

    def save(self):
        try:
            author = UserAccount.objects.get(id=self.validated_data["id"])
            sadgegrdzelo = Sadgegrdzelo(
                title=self.validated_data['title'],
                description=self.validated_data['description'],
                audio=self.validated_data['audio'],
                user=author
            )
            sadgegrdzelo.save()
        except UserAccount.DoesNotExist as e:
            raise serializers.ValidationError(e)

class GetAllSadgegrdzeloSerializer(serializers.ModelSerializer):
    audio_url = serializers.SerializerMethodField("get_full_audio_path")
    user_name = serializers.CharField(source="user.username", read_only=True)
    class Meta:
        model = Sadgegrdzelo
        fields = ["id", "title", "description", "audio_url", "user", "user_name"]

    def get_full_audio_path(self, sad):
        request = self.context.get('request')
        audio_url = sad.audio.url
        return request.build_absolute_uri(audio_url)
