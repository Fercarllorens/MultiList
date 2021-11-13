from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict

import global_variables as gv
from ..models import List;
from ..models import User;
import json

class PostList(APIView):
    def post(self, request, format=None):
        data = request.data
        obj = List.objects.create(name = data[gv.LIST.NAME], type = data[gv.LIST.TYPE], 
            contents = '{"items":[]}', user_id = data[gv.LIST.USER_ID], custom = data[gv.LIST.CUSTOM]) 
        usr = User.objects.get(id=request.data[gv.USER.ID])
        string_json = usr.lists
        content_json = json.loads(string_json)
        content_json.append(model_to_dict(obj)['id'])
        string_json = json.dumps(content_json)
        User.objects.update_or_create(id = usr.id, defaults={
            gv.USER.LISTS: string_json
        })
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        
class PutList(APIView):
    def put(self, request, format=None):
        obj = List.objects.get(request.query_params[gv.LIST.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.contents = request.query_params[gv.LIST.CONTENTS]
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetListsByUser(APIView):
    def get(self, request, format=None):
        try:
            objs = List.objects.filter(type=request.GET[gv.LIST.TYPE], user_id=request.GET[gv.LIST.USER_ID])
            return Response(json.dumps([model_to_dict(i) for i in objs]), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({gv.COMMON.ERROR: "Item not found"}, status=status.HTTP_204_NO_CONTENT)

class GetList(APIView):
    def get(self, request, format=None):
        obj = List.objects.get(id=request.GET[gv.LIST.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class UpdateListContents(APIView):
    def post(self, request, format=None):
        obj = List.objects.get(type=request.data[gv.LIST.TYPE], user_id=request.data[gv.LIST.USER_ID])
        contentId = request.data['content_id']
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        string_json = obj.contents
        content_json = json.loads(string_json)
        print("DATA ANTES", content_json["items"])
        if contentId not in content_json["items"] :
            content_json["items"].append(contentId)
        string_json = json.dumps(content_json)
        print("DATA DESPUES", string_json)
        List.objects.update_or_create(id = obj.id, defaults={
            gv.LIST.CONTENTS: string_json
        })
        obj = List.objects.get(type=request.data[gv.LIST.TYPE], user_id=request.data[gv.LIST.USER_ID])
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class DeleteListContents(APIView):
    def post(self, request, format=None):
        obj = List.objects.get(type=request.data[gv.LIST.TYPE], user_id=request.data[gv.LIST.USER_ID])
        contentId = request.data['content_id']
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        string_json = obj.contents
        content_json = json.loads(string_json)
        if contentId in content_json["items"] :
            content_json["items"].remove(contentId)
        string_json = json.dumps(content_json)
        obj = List.objects.update_or_create(id = obj.id, defaults={
            gv.LIST.CONTENTS: string_json
        })
        obj = List.objects.get(type=request.data[gv.LIST.TYPE], user_id=request.data[gv.LIST.USER_ID])
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)


def create_default(user):   
    songList = List.objects.create(name = "songs", type = "song", contents = '{"items":[]}', user_id = user)
    filmList = List.objects.create(name = "films", type = "film", contents = '{"items":[]}', user_id = user)
    seriesList = List.objects.create(name = "series", type = "series", contents = '{"items":[]}', user_id = user)
    obj = [songList.id, filmList.id, seriesList.id]
    return obj
