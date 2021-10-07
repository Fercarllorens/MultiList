from datetime import timedelta
# Django
from django.utils import timezone
# Local
from .models import SpotifyToken
import global_variables as gv

def get_user_tokens(sess_id: str) -> SpotifyToken or None:
    """Returns the user tokens or None if no tokens were found"""
    user_tokens = SpotifyToken.objects.filter(user=sess_id)
    if user_tokens.exists():
        # Every user will have only one SpotifyToken linked to it
        return user_tokens[0]
    return None

def update_user_tokens(sess_id: str, access_token: str, token_type: str, expires_in: int, refresh_token: str) -> tuple:
    """
        Updates or Creates a new SpotifyToken with the given data and returns the object, 
        and a bool determining whether the object was created or not
    """
    # Get the actual time the token will expire
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    obj, created = SpotifyToken.objects.update_or_create(user=sess_id, defaults={
        gv.SPOTIFY.MODEL.ACCESS_TOKEN: access_token,
        gv.SPOTIFY.MODEL.REFRESH_TOKEN: refresh_token,
        gv.SPOTIFY.MODEL.expires_in: expires_in,
        gv.SPOTIFY.MODEL.TOKEN_TYPE: token_type,
    })
    return obj, created

def is_spotify_authenticated(sess_id: str) -> bool:
    tokens = get_user_tokens(sess_id)
    if tokens:
        if tokens.expires_in <= timezone.now():
            pass
    return False

def refresh_spotify_token(sess_id: str) -> None:
    pass