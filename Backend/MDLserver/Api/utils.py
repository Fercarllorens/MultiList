from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
import jwt

import global_variables as gv

def create_token(self):
    token, created = Token.objects.get_or_create(user=self.context['user'])
    return self.context['user'], token.key