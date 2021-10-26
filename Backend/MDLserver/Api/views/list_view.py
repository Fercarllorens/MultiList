from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict

import global_variables as gv
from ..models import List;
import json

class PostList(APIView):
    def post(self, request, format=None):
        data = request.data
        obj = List.objects.create(name = data[gv.LIST.NAME], type = data[gv.LIST.TYPE], contents = '{"items":[]}', user_id = data[gv.LIST.USER_ID]) 
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        

class PutList(APIView):
    def put(self, request, format=None):
        obj = List.objects.get(request.data[gv.LIST.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.contents = request.data[gv.LIST.CONTENTS]
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetListByUser(APIView):
    def get(self, request, format=None):
        obj = List.objects.get(type=request.GET[gv.LIST.TYPE], id=request.GET[gv.LIST.USER_ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetList(APIView):
    def get(self, request, format=None):
        obj = List.objects.get(id=request.GET[gv.LIST.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class UpdateListContents(APIView):
    def post(self, request, format=None):
        obj = List.objects.get(type=request.data[gv.LIST.TYPE], id=request.data[gv.LIST.USER_ID])
        contentId = request.data['contentId']
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        string_json = obj.contents
        content_json = json.loads(string_json)
        content_json.items.append(contentId)
        string_json = json.dumps(content_json)
        obj = List.objects.update_or_create(id = obj.id, defaults={
            gv.LISTS.CONTENTS: string_json
        })
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

def create_default(user):   
    songList = List.objects.create(name = "songs", type = "songs", contents = '{"items":[]}', user_id = user)
    filmList = List.objects.create(name = "films", type = "films", contents = '{"items":[]}', user_id = user)
    seriesList = List.objects.create(name = "series", type = "series", contents = '{"items":[]}', user_id = user)
    obj = [songList.id, filmList.id, seriesList.id]
    return obj
