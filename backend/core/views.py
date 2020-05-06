from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Sadgegrdzelo
from .serializers import SadgegrdzeloSerializer
# Create your views here.


class CreateSadgegrdzelo(APIView):
    
    def post(self, request):
        serializer = SadgegrdzeloSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "sadgegrdzelo created", status=status.HTTP_201_CREATED})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)