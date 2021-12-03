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


class GetMovie(APIView):
    def get(self, request, format=None):
        endpoint = "search/movie"
        query_params = {
            "query": request.GET['query'],
            "page": request.GET.get('page', 100)
        }
        res = ut.request_tmdb_api(endpoint, query_params)
        return Response(res, status=status.HTTP_200_OK)

class GetMovieById(APIView):
    def get(self, request, format=None):
        endpoint = f"movie/{request.GET['id']}"
        query_params = {}
        res = ut.request_tmdb_api(endpoint, query_params)
        return Response(res, status=status.HTTP_200_OK)


class GetPeople(APIView):
    def get(self, request, format=None):
        endpoint = "search/person"
        query_params = {
            "query": request.GET['query'],
            "page": request.GET.get('page', 100)
        }
        res = ut.request_tmdb_api(endpoint, query_params)
        return Response(res, status=status.HTTP_200_OK)

class GetShow(APIView):
    def get(self, request, format=None):
        endpoint = "search/tv"
        query_params = {
            "query": request.GET['query'],
            "page": request.GET.get('page', 100)
        }
        res = ut.request_tmdb_api(endpoint, query_params)    
        return Response(res, status=status.HTTP_200_OK)

class GetShowById(APIView):
    def get(self, request, format=None):
        endpoint = f"tv/{request.GET['id']}"
        query_params = {}
        res = ut.request_tmdb_api(endpoint, query_params)
        return Response(res, status=status.HTTP_200_OK)

class GetMovieCredits(APIView):
    def get(self, request, format=None):
        endpoint = f"movie/{request.GET['id']}/credits"
        res = ut.request_tmdb_api(endpoint, {})
        return Response(res, status=status.HTTP_200_OK)

class GetShowCredits(APIView):
    def get(self, request, format=None):
        endpoint = f"tv/{request.GET['id']}/credits"
        res = ut.request_tmdb_api(endpoint, {})
        return Response(res, status=status.HTTP_200_OK)

class GetMovieTrailer(APIView):
    def get(self, request, format=None):
        endpoint = f"movie/{request.GET['id']}/videos"
        res = ut.request_tmdb_api(endpoint, {})
        return Response(res, status=status.HTTP_200_OK)

class GetShowTrailer(APIView):
    def get(self, request, format=None):
        endpoint = f"tv/{request.GET['id']}/videos"
        res = ut.request_tmdb_api(endpoint, {})
        return Response(res, status=status.HTTP_200_OK)
