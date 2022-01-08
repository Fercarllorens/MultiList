from datetime import timedelta
import requests as req
# Django
from django.utils import timezone
# Local
from .models import SpotifyToken
import Api.models as api_models
import global_variables as gv

from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI #TODO MOVE THIS TO ENV VARIABLES

def get_user_tokens(user_id: str) -> SpotifyToken or None:
    """Returns the user tokens or None if no tokens were found"""
    user_object = api_models.User.objects.get(id=user_id)
    user_token = SpotifyToken.objects.get(id=user_object.spotify_token) 
    if user_token:
        # Every user will have only one SpotifyToken linked to it
        return user_token
    return None

def update_user_tokens(user_id, access_token, token_type, expires_in, refresh_token) -> tuple:
    """
        Updates or Creates a new SpotifyToken with the given data and returns the object, 
        and a bool determining whether the object was created or not
    """
    # Get the actual time the token will expire
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    if user_id:
        user_token = get_user_tokens(user_id)
        user_token.access_token = access_token
        user_token.refresh_token = refresh_token
        user_token.expires_in = expires_in
        user_token.token_type = token_type
        user_token.save()
        return user_token

    obj = SpotifyToken.objects.create(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=expires_in,
        token_type=token_type,
    )
    return obj

def link_user(user_id: str, sptk: str):
    user_object = api_models.User.objects.get(id=user_id)
    if user_object:
        user_object.spotify_token = sptk
        user_object.save()

def is_spotify_authenticated(user_id: str) -> bool:
    """Returns wether the user is auth or not, and updates the user token given the user_id"""
    tokens = get_user_tokens(user_id)
    if tokens:
        if tokens.expires_in <= timezone.now():
            refresh_spotify_token(user_id)
        return True
    return False

def refresh_spotify_token(user_id: str) -> None:
    """Updates the user token given the user_id"""
    refresh_token = get_user_tokens(user_id).refresh_token

    response = req.post(gv.SPOTIFY.URL.TOKENS, data={
        gv.SPOTIFY.REQUEST.GRANT_TYPE: gv.SPOTIFY.MODEL.REFRESH_TOKEN,
        gv.SPOTIFY.MODEL.REFRESH_TOKEN: refresh_token,
        gv.SPOTIFY.REQUEST.CLIENT_ID: CLIENT_ID,
        gv.SPOTIFY.REQUEST.CLIENT_SECRET: CLIENT_SECRET,
    }).json()
    access_token = response[gv.SPOTIFY.MODEL.ACCESS_TOKEN]
    token_type = response[gv.SPOTIFY.MODEL.TOKEN_TYPE]
    expires_in = response[gv.SPOTIFY.MODEL.EXPIRES_IN]
    new_refresh_token = response.get(gv.SPOTIFY.MODEL.REFRESH_TOKEN, None)
    refresh_token = new_refresh_token if new_refresh_token else refresh_token

    update_user_tokens(user_id, access_token, token_type, expires_in, refresh_token)

def request_spotify_api(req_type: str, user_id: str, endpoint: str) -> dict:
    """Executes a request to the spotify api, provided with the req_type, the endpoint, and the user id"""
    tokens = get_user_tokens(user_id)
    headers = {'Content-Type': 'application/json', 'Authorization': "Bearer " + tokens.access_token} 
    requests = {
        "POST": req.post,
        "PUT":  req.put,
        "GET":  req.get,
    }

    try:
        return requests[req_type](gv.SPOTIFY.URL.BASE + endpoint, headers=headers).json()
    except:
        return {gv.COMMON.ERROR: gv.SPOTIFY.ERRORS.REQUEST}

def get_item(req_type: str, user_id, item_id: str) -> dict:
    """Returns an item given the type, the session id, and the id of the item"""
    endpoint = gv.SPOTIFY.ENDPOINTS.ITEMS[req_type].format(id=item_id)
    return request_spotify_api("GET", user_id, endpoint)
