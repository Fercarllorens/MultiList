from django.urls import path
from .views import AuthURL, IsAuth, Api, spotify_callback

urlpatterns = [
    path("get-auth-url", AuthURL.as_view()),
    path("redirect", spotify_callback),
    path("is-auth", IsAuth.as_view()),
    path("search", Api.search),
    path("get-track", Api.get_track),
    path("get-album", Api.get_album),
    path("get-artist", Api.get_artist),
]