from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict
import global_variables as gv
from ..models import Song;

# Create your views here.
class PostSong(APIView):
    def post(self, request, format=None):
        data = request.data[gv.COMMON.ID]
        obj = Song.objects.create(external_id = data[gv.Song.EXTERNAL_ID])
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        
class PutSong(APIView):
    def put(self, request, format=None):
        obj = Song.objects.get(request.data[gv.COMMON.CONTENT])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.external_id = request.data[gv.Song.EXTERNAL_ID]
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetSong(APIView):
    def get(self, request, format=None):
        obj = Song.objects.get(id=request.GET[gv.COMMON.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)