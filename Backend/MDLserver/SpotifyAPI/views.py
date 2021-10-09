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

    #TODO gv
def spotify_callback(request, format=None) -> redirect:
    """callback sent to the spotify api, to save the user data and redirect to the main frontend page"""
    # Get request params
    # TODO: treat the error
    error = request.GET.get('error', None)
    # Get all the response data as json
    response = req.post(gv.SPOTIFY.URL.TOKENS, data={
        gv.SPOTIFY.REQUEST.GRANT_TYPE:      gv.SPOTIFY.REQUEST.TYPES.AUTH_CODE,
        gv.SPOTIFY.REQUEST.TYPES.CODE:       request.GET[gv.SPOTIFY.REQUEST.TYPES.CODE],
        gv.SPOTIFY.REQUEST.REDIRECT_URI:    REDIRECT_URI,
        gv.SPOTIFY.REQUEST.CLIENT_ID:       CLIENT_ID,
        gv.SPOTIFY.REQUEST.CLIENT_SECRET:   CLIENT_SECRET,
    }).json()
    # TODO: treat the error
    error = response.get('error', None)
    # Create session if it was disconected
    if not request.session.exists(request.session.session_key):
        request.session.create()
    ut.update_user_tokens(
        request.session.session_key,
        response.get('access_token'), 
        response.get('token_type'), 
        response.get('refresh_token'), 
        response.get('expires_in'),
    )
    # Returns a redirect to the main page of the frontend, frontend should manage the redirect inside
    return redirect('frontend:')

class IsAuth(APIView):
    def get(self, request, format=None):
        """Returns wether the user is authenticated or not"""
        is_auth = ut.is_spotify_authenticated(request.session.session_key)
        return Response({gv.SPOTIFY.RESPONSE.STATUS: is_auth}, status=status.HTTP_200_OK)


class Api(APIView):
    def search(self, request, format=None):
        """Returns a list of items given the query and the search_type"""
        endpoint = gv.SPOTIFY.ENDPOINTS.SEARCH.format(request.session.get('query'), request.session.get('type'))
        response = ut.request_spotify_api("GET", request.session.get('user'), endpoint)
        if gv.COMMON.ERROR in response or gv.COMMON.ITEMS not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        items = response[gv.COMMON.ITEMS]
        return Response(items, status=status.HTTP_200_OK)

    def get_track(self, request, format=None):
        """Returns a track object given the id"""
        response = self.get_item("track", request.session.get('user'), request.session.get('id'))
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        return Response(response, status=status.HTTP_200_OK)

    def get_album(self, request, format=None):
        """Returns an album object given the id"""
        response = self.get_item("album", request.session.get('user'), request.session.get('id'))
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        return Response(response, status=status.HTTP_200_OK)

    def get_artist(self, request, format=None):
        """Returns an artist object given the id"""
        response = self.get_item("artist", request.session.get('user'), request.session.get('id'))
        if gv.COMMON.ERROR in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        return Response(response, status=status.HTTP_200_OK)

    def get_item(self, req_type: str, sess_id, item_id: str) -> json:
        """Returns an item given the type, the session id, and the id of the item"""
        endpoint = gv.SPOTIFY.ENDPOINTS.ITEMS[req_type].format(item_id)
        return ut.request_spotify_api("GET", sess_id, endpoint)