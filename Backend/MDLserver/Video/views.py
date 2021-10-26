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
    # source_id; source; opt -> country;
    def get(self, request, format=None):
        """Returns a film/series given the id"""
        endpoint = gv.VIDEO.ENDPOINTS.BYID
        query_params = {
            gv.VIDEO.REQUEST.SRC_ID: request.GET[gv.VIDEO.REQUEST.SRC_ID], 
            gv.VIDEO.REQUEST.SRC: request.GET[gv.VIDEO.REQUEST.SRC]
        }
        response = ut.request_to_api(endpoint, query_params)
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        return Response(response, status=status.HTTP_200_OK)


class GetByQuery(APIView):
    def get(self, request, format=None):
        # term; country;
        endpoint = gv.VIDEO.ENDPOINTS.QUERY
        query_params = {
            gv.VIDEO.REQUEST.TERM: request.GET[gv.VIDEO.REQUEST.TERM], 
            gv.VIDEO.REQUEST.COUNTRY: request.GET[gv.VIDEO.REQUEST.COUNTRY]
        }
        response = ut.request_to_api(endpoint, query_params)
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        return Response(response, status=status.HTTP_200_OK)
