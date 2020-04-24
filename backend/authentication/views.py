from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserAccountCreateSerailizer

# Create your views here.


class UserAccountCreate(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format="json"):
        serializer = UserAccountCreateSerailizer(data=request.data)

        if serializer.is_valid():
            account = serializer.save()

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "user created"}, status=status.HTTP_201_CREATED)


class HelloWorldView(APIView):
    
    def get(self, request):
        return Response({"hello": "world"}, status=status.HTTP_200_OK)