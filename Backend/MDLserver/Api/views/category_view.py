from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.forms.models import model_to_dict

# Local
from ..models import Category
import global_variables as gv

import json

class GetCategory(APIView):
    def get(self, request, format=None):
        """Returns Category if existing"""
        obj = Category.objects.get(id=request.GET[gv.CATEGORY.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetCategoriesByType(APIView):
    def get(self, request, format=None):
        try:

            objs = Category.objects.filter(type=request.GET[gv.CATEGORY.TYPE])
            return Response(json.dumps([model_to_dict(i) for i in objs]), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({gv.COMMON.ERROR: "Item not found"}, status=status.HTTP_204_NO_CONTENT)

class PostCategory(APIView):
    def post(self, request, format=None):
        """Creates and return a Category Model"""
        data = request.data
        obj, created = Category.objects.update_or_create(name = data[gv.CATEGORY.NAME], type = data[gv.CATEGORY.TYPE])
        if created:
            return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class PutCategory(APIView):
    def put(self, request, format=None):
        """Updates an existing category"""
        obj = Category.objects.get(id=request.GET[gv.COMMON.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.name = request.data[gv.CATEGORY.NAME]
        obj.type = request.data[gv.CATEGORY.TYPE]