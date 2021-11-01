from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict

import global_variables as gv
from ..models import MultimediaContent;

# Create your views here.
class PostContent(APIView):
    def post(self, request, format=None):
        data = request.data
        obj, created = MultimediaContent.objects.get_or_create(external_id = data[gv.MULTIMEDIA_CONTENT.EXTERNAL_ID], defaults={
            gv.MULTIMEDIA_CONTENT.NAME: data[gv.MULTIMEDIA_CONTENT.NAME],
            gv.MULTIMEDIA_CONTENT.TYPE: data[gv.MULTIMEDIA_CONTENT.TYPE],
            gv.MULTIMEDIA_CONTENT.TOTAL_RATING: 0,
        })
        if created:
            return Response(model_to_dict(obj), status=status.HTTP_201_CREATED)
        return Response(model_to_dict(obj), status=status.HTTP_302_FOUND)
        
#All components of the item are required to update it!!
class PutContent(APIView):
    def put(self, request, format=None):
        obj = MultimediaContent.objects.get(id = request.data[gv.COMMON.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.name = request.data[gv.MULTIMEDIA_CONTENT.NAME]
        obj.external_id = request.data[gv.MULTIMEDIA_CONTENT.EXTERNAL_ID]
        obj.total_rating = request.data[gv.MULTIMEDIA_CONTENT.TOTAL_RATING]
        obj.comments = request.data[gv.MULTIMEDIA_CONTENT.COMMENTS]
        obj.save()
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetContent(APIView):
    def get(self, request, format=None):
        try:
            obj = MultimediaContent.objects.get(external_id=request.GET[gv.COMMON.ID])
            return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({gv.COMMON.ERROR: "Item does not exists"}, status=status.HTTP_204_NO_CONTENT)


   
    
