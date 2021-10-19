from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

import global_variables as gv
from ..models import Series;

# Create your views here.
class PostSeries(APIView):
    def post(self, request, format=None):
        data = request.POST[gv.COMMON.ID]
        obj = Series.objects.create(external_id = data[gv.SERIES.EXTERNAL_ID])
        return Response({obj}, status=status.HTTP_200_OK)
        
class PutSeries(APIView):
    def put(self, request, format=None):
        obj = Series.objects.get(request.POST[gv.COMMON.CONTENT])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        obj.external_id = request.POST[gv.SERIES.EXTERNAL_ID]
        return Response({obj}, status=status.HTTP_200_OK)

class GetSeries(APIView):
    def get(self, request, format=None):
        obj = Series.objects.get(id=request.POST[gv.COMMON.ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        return Response({obj}, status=status.HTTP_200_OK)