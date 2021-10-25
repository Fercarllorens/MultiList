from typing import List
from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from Backend.MDLserver import global_variables as gv
from .. import Lists;

class PostFilm(APIView):
    def post(self, request, format=None):
        data = request.POST[gv.COMMON.ID]
        obj = List.objects.create(name = data[gv.LIST.NAME], type = data[gv.LIST.TYPE], elements = data[gv.LIST.ELEMENTS], user_id = data[gv.LIST.USER_ID]) 
        return Response({obj}, status=status.HTTP_200_OK)
        
class PutFilm(APIView):
    def put(self, request, format=None):
        obj = List.objects.get(request.POST[gv.COMMON.CONTENT])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        obj.external_id = request.POST[gv.FILM.EXTERNAL_ID]
        return Response({obj}, status=status.HTTP_200_OK)

class GetFilm(APIView):
    def get(self, request, format=None):
        obj = List.objects.get(id=request.POST[gv.COMMON.ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        return Response({obj}, status=status.HTTP_200_OK)