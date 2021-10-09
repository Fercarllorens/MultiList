import json
import requests as req
# Django
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
# Local
import global_variables as gv
from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI #TODO MOVE THIS TO ENV VARIABLES
from . import utils as ut

class AuthURL(APIView):
    def get(self, request, format=None) -> Response:
        """Returns a url generated for the frontend to authenticate the user on our spotify app"""

        url = req.Request("GET", gv.SPOTIFY.URL.AUTH, params={
            gv.SPOTIFY.REQUEST.SCOPE:           gv.SPOTIFY.SCOPES.PLAYLIST,
            gv.SPOTIFY.REQUEST.RESPONSE_TYPE:   gv.SPOTIFY.REQUEST.TYPES.CODE,
            gv.SPOTIFY.REQUEST.REDIRECT_URI:    REDIRECT_URI,
            gv.SPOTIFY.REQUEST.CLIENT_ID:       CLIENT_ID,
        }).prepare().url

        return Response({gv.SPOTIFY.RESPONSE.URL: url}, status=status.HTTP_200_OK)

def spotify_callback(request, format=None) -> redirect:
    """callback sent to the spotify api, to save the user data and redirect to the main frontend page"""
    if error := request.GET.get(gv.COMMON.ERROR, None) is not None:
        return Response({gv.COMMON.ERROR: error}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # Get all the response data as json
    response = req.post(gv.SPOTIFY.URL.TOKENS, data={
        gv.SPOTIFY.REQUEST.GRANT_TYPE:      gv.SPOTIFY.REQUEST.TYPES.AUTH_CODE,
        gv.SPOTIFY.REQUEST.TYPES.CODE:       request.GET[gv.SPOTIFY.REQUEST.TYPES.CODE],
        gv.SPOTIFY.REQUEST.REDIRECT_URI:    REDIRECT_URI,
        gv.SPOTIFY.REQUEST.CLIENT_ID:       CLIENT_ID,
        gv.SPOTIFY.REQUEST.CLIENT_SECRET:   CLIENT_SECRET,
    }).json()
    if error := response.get(gv.COMMON.ERROR, None) is not None:
        return Response({gv.COMMON.ERROR: error}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # Create session if it was disconected
    if not request.session.exists(request.session.session_key):
        request.session.create()
    # TODO: change session_key to user ID, so it links them
    ut.update_user_tokens(
        request.session.session_key,
        response.get(gv.SPOTIFY.MODEL.ACCESS_TOKEN), 
        response.get(gv.SPOTIFY.MODEL.TOKEN_TYPE), 
        response.get(gv.SPOTIFY.MODEL.REFRESH_TOKEN), 
        response.get(gv.SPOTIFY.MODEL.EXPIRES_IN),
    )
    # Returns a redirect to the main page of the frontend, frontend should manage the redirect inside
    return redirect('frontend:')

class IsAuth(APIView):
    def get(self, request, format=None):
        """Returns wether the user is authenticated or not"""
        is_auth = ut.is_spotify_authenticated(request.session.session_key)
        return Response({gv.SPOTIFY.RESPONSE.STATUS: is_auth}, status=status.HTTP_200_OK)


class Search(APIView):
    def get(self, request, format=None):
        """Returns a list of items given the query and the search_type"""
        print("REQUEST: ", request.query_params.get('query'))
        endpoint = gv.SPOTIFY.ENDPOINTS.SEARCH.format(query=request.query_params.get(gv.COMMON.QUERY), type=request.query_params.get(gv.COMMON.TYPE))
        response = ut.request_spotify_api("GET", request.query_params.get(gv.COMMON.USER), endpoint)
        if gv.COMMON.ERROR in response or gv.COMMON.ITEMS not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        return Response(response, status=status.HTTP_200_OK)

class GetTrack(APIView):
    def get(self, request, format=None):
        """Returns a track object given the id"""
        response = ut.get_item("track", request.query_params.get(gv.COMMON.USER), request.query_params.get(gv.COMMON.ID))
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        return Response(response, status=status.HTTP_200_OK)

class GetAlbum(APIView):
    def get(self, request, format=None):
        """Returns an album object given the id"""
        response = ut.get_item("album", request.query_params.get(gv.COMMON.USER), request.query_params.get(gv.COMMON.ID))
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        return Response(response, status=status.HTTP_200_OK)

class GetArtists(APIView):
    def get(self, request, format=None):
        """Returns an artist object given the id"""
        response = ut.get_item("artist", request.query_params.get(gv.COMMON.USER), request.query_params.get(gv.COMMON.ID))
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        return Response(response, status=status.HTTP_200_OK)