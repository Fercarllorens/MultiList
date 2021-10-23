from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken import jwt

import global_variables as gv

def create_token(username, password):
    token = jwt.encode({username, password}, "ilhsabfvlsaikjdhbfc", algorithm="HS256")
    return token