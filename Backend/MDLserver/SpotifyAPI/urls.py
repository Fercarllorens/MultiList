from django.urls import path
from .views import AuthURL, IsAuth, GetTrack, GetAlbum, GetArtists, Search, spotify_callback

urlpatterns = [
    path("get-auth-url", AuthURL.as_view()),
    path("redirect", spotify_callback),
    path("is-auth", IsAuth.as_view()),
    path("search", Search.as_view()),
    path("get-track", GetTrack.as_view()),
    path("get-album", GetAlbum.as_view()),
    path("get-artist", GetArtists.as_view()),
]