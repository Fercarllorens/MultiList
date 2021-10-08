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

"""
class Api(APIView):
    def get(self, request, format=None):
        user = request.GET.get('user')
        q = request.session.get('query')
        t = request.session.get('type')
        query = gv.SPOTIFY.URL.SEARCH.format(query=q, type=t)
        req.Request('GET', url=query, headers=gv.SPOTIFY.HEADER.format(token))
"""

# THIS CLASS IS ON HOLD FOR NOW
class AuthURL(APIView):
    def get(self, request, format=None) -> Response:
        """Returns a url generated for the frontend to authenticate the user on our spotify app"""

        url = req.Request("GET", gv.SPOTIFY.URL.AUTH, params={
            gv.SPOTIFY.REQUEST.SCOPE:           gv.SPOTIFY.SCOPES.CONNECT,
            gv.SPOTIFY.REQUEST.RESPONSE_TYPE:   gv.SPOTIFY.REQUEST.TYPES.CODE,
            gv.SPOTIFY.REQUEST.REDIRECT_URI:    REDIRECT_URI,
            gv.SPOTIFY.REQUEST.CLIENT_ID:       CLIENT_ID,
        }).prepare().url

        return Response({gv.SPOTIFY.RESPONSE.URL: url}, status=status.HTTP_200_OK)

    #TODO gv
    def spotify_callback(self, request, format=None) -> redirect:
        """callback sent to the spotify api, to save the user data and redirect to the main frontend page"""
        # Get request params
        # TODO: treat the error
        error = request.GET.get('error')
        # Get all the response data as json
        response = req.post(gv.SPOTIFY.URL.TOKENS, data={
            gv.SPOTIFY.REQUEST.GRANT_TYPE: gv.SPOTIFY.REQUEST.TYPES.AUTH_CODE,
            gv.SPOTIFY.REQUEST.TYPE.CODE: request.GET[gv.SPOTIFY.REQUEST.TYPES.CODE],
            gv.SPOTIFY.REQUEST.REDIRECT_URI: REDIRECT_URI,
            gv.SPOTIFY.REQUEST.CLIENT_ID: CLIENT_ID,
            gv.SPOTIFY.REQUEST.CLIENT_SECRET: CLIENT_SECRET,
        }).json
        # TODO: treat the error
        error = response.get('error')
        # Create session if it was disconected
        if not request.session.exists(request.session.session_key):
            request.session.create()

        ut.update_user_tokens(
            request.session.session_key,
            response['access_token'], 
            response['token_type'], 
            response['refresh_token'], 
            response['expires_in'],
        )
        # Returns a redirect to the main page of the frontend, frontend should manage the redirect inside
        return redirect('frontend:')

class IsAuth(APIView):
    def get(self, request, format=None):
        """Returns wether the user is authenticated or not"""
        is_auth = ut.is_spotify_authenticated(request.session.session_key)
        return Response({'status': is_auth}, status=status.HTTP_200_OK)