from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import global_variables as gv
from .. import Film;

# Create your views here.
class FilmHandler(models.Film):
    def post(self, request, format=None):
        obj = Film.objects.create(request.POST[gv.COMMON.CONTENT.ID])
        return Response({obj}, status=status.HTTP_200_OK)

    def put(self, request, format=None):
        obj = Film.objects.get(request.POST[gv.COMMON.CONTENT.ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        obj.external_id = request.POST(gv.COMMON.CONTENT.ID)
        return Response({obj}, status=status.HTTP_200_OK)

    def get(self, request, format=None):
        obj = Film.objects.get(id=request.POST[gv.COMMON.ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        return Response({obj}, status=status.HTTP_200_OK)

    