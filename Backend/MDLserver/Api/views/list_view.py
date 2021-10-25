from typing import List
from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from Backend.MDLserver import global_variables as gv
from .. import List;

class PostList(APIView):
    def post(self, request, format=None):
        data = request.POST[gv.COMMON.ID]
        obj = List.objects.create(name = data[gv.LIST.NAME], type = data[gv.LIST.TYPE], contents = data[gv.LIST.CONTENTS], user_id = data[gv.LIST.USER_ID]) 
        return Response({obj}, status=status.HTTP_200_OK)
        
class PutList(APIView):
    def put(self, request, format=None):
        obj = List.objects.get(request.POST[gv.COMMON.ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        obj.contents = request.POST[gv.LIST.CONTENTS]
        return Response({obj}, status=status.HTTP_200_OK)

class GetList(APIView):
    def get(self, request, format=None):
        obj = List.objects.get(id=request.POST[gv.COMMON.ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        return Response({obj}, status=status.HTTP_200_OK)

class UpdateListContents(APIView):
    def update(self, request, format=None):
        obj = List.objets.get(id=request.POST[gv.COMMON.ID])
        contId = request.POST[content_id]
        if obj is None | contId is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        obj.contents = request.POST[gv.LIST.CONTENTS]
        obj.contents = obj.contents.push(contId)
        return Response({obj}, status=status.HTTP_200_OK)