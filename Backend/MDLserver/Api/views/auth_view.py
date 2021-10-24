from django.shortcuts import render, redirect
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework import authtoken, status
from rest_framework.response import Response

import global_variables as gv
from ..models import User
from ..utils import create_token

# Create your views here.
class Login(APIView):
    def post(self, request, format=None):
        email = request.POST[gv.USER.EMAIL]
        password = request.POST[gv.USER.PASSWORD]

        if(not email or not password):
            return Response({"Something went wrong with your request"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(email=email, password=password)
        if not user:
            return Response({"Invalid credentials, please try again"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            print('b')
            return Response({self}, status=status.HTTP_200_OK)
            
    

class Register(APIView):
    def post(self, request, format=None):
        username = request.POST[gv.USER.USERNAME]
        password = request.POST[gv.USER.PASSWORD]
        email = request.POST[gv.USER.EMAIL]
        obj = User.objects.create(
            username = username, 
            password = password, 
            email = email, 
            auth_token = create_token(username = username, password = password))

        return Response({obj}, status=status.HTTP_200_OK)

