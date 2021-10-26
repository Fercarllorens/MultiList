from typing import List
from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


import global_variables as gv
from ..models import List;
import json

class PostList(APIView):
    def post(self, request, format=None):
        data = request.POST[gv.COMMON.ID]
        obj = List.objects.create(name = data[gv.LIST.NAME], type = data[gv.LIST.TYPE], contents = '{"items":[]}', user_id = data[gv.LIST.USER_ID]) 
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
        obj = List.objects.get(type=request.POST[gv.LIST.TYPE], id=request.POST[gv.LIST.USER_ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        return Response({obj}, status=status.HTTP_200_OK)

class UpdateListContents(APIView):
    def post(self, request, format=None):
        obj = List.objects.get(type=request.POST[gv.LIST.TYPE], id=request.POST[gv.LIST.USER_ID])
        contentId = request.POST['contentId']
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        string_json = obj.contents
        content_json = json.loads(string_json)
        content_json.items.append(contentId)
        string_json = json.dumps(content_json)
        obj = List.objects.update_or_create(id = obj.id, defaults={
            gv.LISTS.CONTENTS: string_json
        })
        return Response({obj}, status=status.HTTP_200_OK)