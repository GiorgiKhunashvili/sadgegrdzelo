from rest_framework import serializers
from .models import UserAccount


class UserAccountCreateSerailizer(serializers.ModelSerializer):
    """ serializer for regestring Users """
    email = serializers.EmailField(required=True)
    username = serializers.CharField(max_length=30)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = UserAccount
        fields = ["email", "username", "password"]
        extra_kwargs = { 'password': {'write_only': True}}

    def create(self, validate_data):
        password = validate_data.pop("password", None)
        instance = self.Meta.model(**validate_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance