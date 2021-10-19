from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

import global_variables as gv
from ..models import Film;

# Create your views here.
class PostFilm(APIView):
    def post(self, request, format=None):
        data = request.POST[gv.COMMON.ID]
        obj = Film.objects.create(external_id = data[gv.FILM.EXTERNAL_ID])
        return Response({obj}, status=status.HTTP_200_OK)
        
class PutFilm(APIView):
    def put(self, request, format=None):
        obj = Film.objects.get(request.POST[gv.COMMON.CONTENT])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        obj.external_id = request.POST[gv.FILM.EXTERNAL_ID]
        return Response({obj}, status=status.HTTP_200_OK)

class GetFilm(APIView):
    def get(self, request, format=None):
        obj = Film.objects.get(id=request.POST[gv.COMMON.ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        return Response({obj}, status=status.HTTP_200_OK)

    