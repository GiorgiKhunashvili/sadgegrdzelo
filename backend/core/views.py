from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import Sadgegrdzelo
from .serializers import SadgegrdzeloSerializer, GetAllSadgegrdzeloSerializer
# Create your views here.


class CreateSadgegrdzelo(APIView):
    def post(self, request):
        serializer = SadgegrdzeloSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "sadgegrdzelo created" }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetAllSadgegrdzelo(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, requset):
        all_sadgegrdzelo = Sadgegrdzelo.objects.all()
        serializer = GetAllSadgegrdzeloSerializer(all_sadgegrdzelo, context={"request": requset}, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)