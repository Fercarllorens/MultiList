# Django
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
# Local
import global_variables as gv
from . import utils as ut

# Create your views here.
class GetById(APIView):
    def get(self, request, format=None):
        """Returns a film/series given the id"""
        endpoint = gv.VIDEO.ENDPOINTS.BYID.format(id=request.query_params.get(gv.COMMON.ID))
        response = ut.request_to_api("GET", endpoint)
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        return Response(response, status=status.HTTP_200_OK)


class GetByQuery(APIView):
    def get(self, request, format=None):
        endpoint = gv.VIDEO.ENDPOINTS.QUERY.format(query=request.query_params.get(gv.COMMON.QUERY))
        response = ut.request_to_api("GET", endpoint)
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        return Response(response, status=status.HTTP_200_OK)
