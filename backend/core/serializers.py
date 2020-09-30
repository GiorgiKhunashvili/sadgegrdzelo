from rest_framework import serializers
from .models import Sadgegrdzelo
from authentication.models import UserAccount

class SadgegrdzeloSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Sadgegrdzelo
        fields = ["id", 'title', "description", "audio"]

    def save(self, user):
        try:
            sadgegrdzelo = Sadgegrdzelo(
                title=self.validated_data['title'],
                description=self.validated_data['description'],
                audio=self.validated_data['audio'],
                user=user
            )
            sadgegrdzelo.save()
        except UserAccount.DoesNotExist as e:
            raise serializers.ValidationError(e)

class GetAllSadgegrdzeloSerializer(serializers.ModelSerializer):
    audio_url = serializers.SerializerMethodField("get_full_audio_path")
    profile_image_url = serializers.SerializerMethodField("get_full_profile_image_path")
    user_name = serializers.CharField(source="user.username", read_only=True)
    class Meta:
        model = Sadgegrdzelo
        fields = ["id", "title", "description", "audio_url", "user", "user_name", "profile_image_url"]

    def get_full_audio_path(self, sad):
        request = self.context.get('request')
        audio_url = sad.audio.url
        return request.build_absolute_uri(audio_url)
    
    def get_full_profile_image_path(self, sad):
        request = self.context.get('request')
        profile_image_url = sad.user.profile_image.url
        return request.build_absolute_uri(profile_image_url)