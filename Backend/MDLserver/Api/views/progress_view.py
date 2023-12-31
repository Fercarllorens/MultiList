from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict

import global_variables as gv
from ..models import Progress;
import json

class PostProgress(APIView):
    def post(self, request, format=None):
        data = request.POST
        obj = Progress.objects.create(user_id = data[gv.PROGRESS.USER_ID], content_id = data[gv.PROGRESS.CONTENT_ID], state = data[gv.PROGRESS.STATE] , progress = data[gv.PROGRESS.PROGRESS]) 
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        

class PutProgress(APIView):
    def put(self, request, format=None):
        obj = Progress.objects.get(user_id = request.data[gv.PROGRESS.USER_ID], content_id = request.data[gv.PROGRESS.CONTENT_ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.contents = request.data[gv.LIST.CONTENTS]
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetProgress(APIView):
    def get(self, request, format=None):
        obj = Progress.objects.get(user_id=request.GET[gv.PROGRESS.USER_ID], content_id=request.GET[gv.PROGRESS.CONTENT_ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class UpdateProgress(APIView):
    def post(self, request, format=None):
        user_id = request.data[gv.PROGRESS.USER_ID]
        content_id = request.data[gv.PROGRESS.CONTENT_ID]
        state = request.data['state']
        progress = request.data['progress']
        
        obj, created = Progress.objects.update_or_create(user_id = user_id, content_id = content_id, defaults={
            'state': state,
            'progress': progress
        })
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        