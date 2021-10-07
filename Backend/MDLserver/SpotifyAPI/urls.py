from django.urls import path
from .views import AuthURL, IsAuth

urlpatterns = [
    path("get-auth-url", AuthURL.as_view()),
    path("redirect", AuthURL.spotify_callback),
    path("is-auth", IsAuth.as_view()),
]