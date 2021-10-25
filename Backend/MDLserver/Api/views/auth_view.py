import re
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

#Local
import global_variables as gv
from ..authbackend import AuthBackend
from ..models import User

# Create your views here.
class Login(APIView):
    def post(self, request, format=None):
        user = AuthBackend.authenticate(
            email = request.data['email'],
            password = request.data['password'])

        if not user:
            return Response('The given credentials are not valid', status=status.HTTP_400_BAD_REQUEST)
        
        token, created = Token.objects.get_or_create(user = user)
        data = {
            'user': user,
            'access_token': token
        }
        
        return Response(data, status=status.HTTP_201_CREATED)
            

class Register(APIView):
    def post(self, request, format=None):
        user = User.objects.create_user(
            request.data['username'],
            request.data['email'],
            request.data['password'])
        data = {
            'id': user.id
        }

        return Response(data, status=status.HTTP_201_CREATED)

