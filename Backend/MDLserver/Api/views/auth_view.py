from django.shortcuts import render, redirect
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework import authtoken, status
from rest_framework.response import Response

#Local
import global_variables as gv
from ..serializers import UserSignUpSerializer, UserLoginSerializer, UserModelSerializer

# Create your views here.
class Login(APIView):
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user, token = serializer.save()
        data = {
            'user': UserModelSerializer(user).data,
            'access_token': token
        }
        
        return Response(data, status=status.HTTP_201_CREATED)
            
    

class Register(APIView):
    def post(self, request, format=None):
        serializer = UserSignUpSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data

        return Response(data, status=status.HTTP_201_CREATED)

