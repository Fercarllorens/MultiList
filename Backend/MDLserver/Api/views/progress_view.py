from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


import global_variables as gv
from ..models import Progress;
import json

class PostProgress(APIView):
    def post(self, request, format=None):
        data = request.POST
        obj = Progress.objects.create(user_id = data[gv.PROGRESS.USER_ID], content_id = data[gv.PROGRESS.CONTENT_ID], state = data[gv.PROGRESS.STATE] , progress = data[gv.PROGRESS.PROGRESS]) 
        return Response({obj}, status=status.HTTP_200_OK)
        

class PutProgress(APIView):
    def put(self, request, format=None):
        obj = Progress.objects.get(user_id = request.data[gv.PROGRESS.USER_ID], content_id = request.data[gv.PROGRESS.CONTENT_ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        obj.contents = request.data[gv.LIST.CONTENTS]
        return Response({obj}, status=status.HTTP_200_OK)

class GetProgress(APIView):
    def get(self, request, format=None):
        obj = Progress.objects.get(user_id=request.GET[gv.PROGRESS.USER_ID], content_id=request.GET[gv.PROGRESS.CONTENT_ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        return Response({obj}, status=status.HTTP_200_OK)

class UpdateProgress(APIView):
    def post(self, request, format=None):
        obj = Progress.objects.get(user_id=request.data[gv.PROGRESS.USER_ID], content_id=request.data[gv.PROGRESS.CONTENT_ID])
        state = request.data['state']
        progress = request.data['progress']
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        obj.state = state
        obj.progress = progress
        obj = Progress.objects.update_or_create(id = obj.id, defaults={
            gv.PROGRESS.STATE: state,
            gv.PROGRESS.PROGRESS: progress
        })
        return Response({obj}, status=status.HTTP_200_OK)
        