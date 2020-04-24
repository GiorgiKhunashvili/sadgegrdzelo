from rest_framework import serializers
from .models import UserAccount


class UserAccountCreateSerailizer(serializers.ModelSerializer):
    """ serializer for regestring Users """

    class Meta:
        model = UserAccount
        fields = ["email", "username", "password"]
        extra_kwargs = { 'password': {'write_only': True}}

    def save(self):
        user_account = UserAccount(
            email=self.validated_data['email'],
            username=self.validated_data['username']
        )
        password = self.validated_data['password']
        user_account.set_password(password)
        user_account.save()
        return user_account