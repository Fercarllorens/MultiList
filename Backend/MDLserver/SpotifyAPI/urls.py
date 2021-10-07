from django.urls import path
from .views import AuthURL

urlpatterns = [
    path("get-auth-url", AuthURL.as_view())
    path("redirect", AuthURL.spotify_callback)
]