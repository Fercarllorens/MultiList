import requests as req
# Django
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
# Local
import global_variables as gv
from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
from . import utils as ut


class Api(APIView):
    def get(self, request: req.Request, format=None):
        q = request.session.get('query')
        t = request.session.get('type')
        query = gv.SPOTIFY.URL.SEARCH.format(query=q, type=t)
        req.Request('GET', url=query, headers=gv.SPOTIFY.HEADER.format(token))


# THIS CLASS IS ON HOLD FOR NOW
class AuthURL(APIView):
    def get(self, request: req.Request, format=None) -> Response:
        """Returns a url generated for the frontend to authenticate the user on our spotify app"""

        url = req.Request("GET", gv.SPOTIFY.URL.AUTH, params={
            gv.SPOTIFY.REQUEST.SCOPE:           gv.SPOTIFY.SCOPES.CONNECT,
            gv.SPOTIFY.REQUEST.RESPONSE_TYPE:   gv.SPOTIFY.REQUEST.TYPES.CODE,
            gv.SPOTIFY.REQUEST.REDIRECT_URI:    REDIRECT_URI,
            gv.SPOTIFY.REQUEST.CLIENT_ID:       CLIENT_ID,
        }).prepare().url

        return Response({gv.SPOTIFY.RESPONSE.URL: url}, status=status.HTTP_200_OK)

    def spotify_callback(self, request: req.Request, format=None) -> redirect:
        # Get request params
        data = request.GET
        code = data.get('code')
        error = data.get('error')

        # Get all the response data as json
        response = req.post(gv.SPOTIFY.URL.TOKENS, data={
            gv.SPOTIFY.REQUEST.GRANT_TYPE: 'authorization_code',
            gv.SPOTIFY.REQUEST.TYPE.CODE: code,
            gv.SPOTIFY.REQUEST.REDIRECT_URI: REDIRECT_URI,
            gv.SPOTIFY.REQUEST.CLIENT_ID: CLIENT_ID,
            gv.SPOTIFY.REQUEST.CLIENT_SECRET: CLIENT_SECRET,
        }).json

        access_token = response.get('access_token')
        token_type = response.get('token_type')
        refresh_token = response.get('refresh_token')
        expires_in = response.get('expires_in')
        error = response.get('error')

        # Create session if it was disconected
        if not request.session.exists(request.session.session_key):
            request.session.create()

        ut.update_user_tokens(
            request.session.session_key,
            access_token, 
            token_type, 
            refresh_token, 
            expires_in
        )
        # Returns a redirect to the main page of the frontend
        return redirect('frontend:')