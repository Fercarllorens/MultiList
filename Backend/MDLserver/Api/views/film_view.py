from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict

import global_variables as gv
from ..models import Film;

# Create your views here.
class PostFilm(APIView):
    def post(self, request, format=None):
        data = request.data
        obj, created = Film.objects.update_or_create(external_id = data[gv.FILM.EXTERNAL_ID], defaults={"name": data[gv.FILM.NAME]})
        if created:
            return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        
class PutFilm(APIView):
    def put(self, request, format=None):
        obj = Film.objects.get(id = request.data[gv.COMMON.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.external_id = request.data[gv.FILM.EXTERNAL_ID]
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetFilm(APIView):
    def get(self, request, format=None):
        obj = Film.objects.get(id=request.GET[gv.COMMON.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)


   
    
