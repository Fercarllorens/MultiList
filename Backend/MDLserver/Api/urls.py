from django.urls import path
from .views import FilmController

app_name = 'Api'

film_urls = [
    path('post-film', FilmController.as_view()),
    path('put-film', FilmController.as_view()),
    path('get-film', FilmController.as_view())
]

