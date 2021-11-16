from rest_framework.views import APIView
from rest_framework import authtoken, status
from rest_framework.response import Response
from django.forms.models import model_to_dict
# Local
from ..utils import create_token
from ..models import User
import global_variables as gv
import json

class GetUser(APIView):
    def get(self, request, format=None):
        """Returns User if existing"""
        obj = User.objects.get(id=request.GET[gv.USER.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetUsersByName(APIView):
    def get(self, request, format=None):
        obj = User.objects.filter(username__icontains=request.GET[gv.USER.USERNAME])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        print("ITEM", obj)
        content_list = [User.objects.get(id=i.id) for i in obj]
        print("LIST", content_list)
        return Response(json.dumps([model_to_dict(item) for item in content_list]))

class PostUser(APIView):
    def post(self, request, format=None):
        """Creates and return a User Model"""
        data = request.data[gv.COMMON.CONTENT]
        obj = User.objects.create(
            username=data[gv.USER.USERNAME],
            password=data[gv.USER.PASSWORD],
            email=data[gv.USER.EMAIL],
        )
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class PutUser(APIView):
    def put(self, request, format=None):
        """Updates an existing user"""
        obj = User.objects.get(id=request.GET[gv.COMMON.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.username = request.data[gv.USER.USERNAME]
        obj.password = request.data[gv.USER.PASSWORD]
        obj.email = request.data[gv.USER.EMAIL]
        obj.spotify_token = request.data[gv.USER.SPOTIFY_TOKEN]
        obj.lists = request.data[gv.USER.LISTS]