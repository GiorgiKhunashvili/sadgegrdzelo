from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserAccountCreateSerailizer

# Create your views here.


class UserAccountCreate(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = ()

    def post(self, request, format="json"):
        serializer = UserAccountCreateSerailizer(data=request.data)

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "user created"}, status=status.HTTP_201_CREATED)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class HelloWorldView(APIView):
    
    def get(self, request):
        return Response({"hello": "world"}, status=status.HTTP_200_OK)