from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict
import global_variables as gv
from ..models import Series;

# Create your views here.
class PostSeries(APIView):
    def post(self, request, format=None):
        data = request.query_params
        print("Data", request.query_params)
        obj = Series.objects.create(external_id = data[gv.SERIES.EXTERNAL_ID], name = data[gv.SERIES.NAME])
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        
class PutSeries(APIView):
    def put(self, request, format=None):
        obj = Series.objects.get(request.data[gv.COMMON.CONTENT])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.external_id = request.data[gv.SERIES.EXTERNAL_ID]
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetSeries(APIView):
    def get(self, request, format=None):
        obj = Series.objects.get(id=request.data[gv.COMMON.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)