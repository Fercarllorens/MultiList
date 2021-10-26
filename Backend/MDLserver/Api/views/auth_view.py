import re
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

#Local
import global_variables as gv
from ..authbackend import AuthBackend
from ..models import User
from .list_view import create_default

# Create your views here.
class Login(APIView):
    def post(self, request, format=None):
        user = User.objects.get(email=request.data[gv.USER.EMAIL])
        if user.password == request.data[gv.USER.PASSWORD]:
            return Response({gv.USER.ID: user.id}, status=status.HTTP_201_CREATED)
        return Response({gv.COMMON.ERROR: "Login failed"}, status=status.HTTP_401_UNAUTHORIZED)
            

class Register(APIView):
    def post(self, request, format=None):
        user, created = User.objects.get_or_create(email=request.data[gv.USER.EMAIL], defaults={
            gv.USER.USERNAME: request.data[gv.USER.USERNAME],
            gv.USER.PASSWORD: request.data[gv.USER.PASSWORD],
        })

        if not created:
            return Response({gv.COMMON.ERROR: "User already exists"}, status=status.HTTP_409_CONFLICT)
        
        lists = create_default(user.id)
        user.lists = str(lists)
        user.save()

        return Response({gv.USER.ID: user.id}, status=status.HTTP_201_CREATED)

