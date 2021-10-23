from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import authtoken, status
from rest_framework.response import Response
from Backend.MDLserver.Api.utils import create_token

import global_variables as gv
from ..models import User

# Create your views here.
class Login(APIView):
    def post(self, request, format=None):
        return "tusmuertos"

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

