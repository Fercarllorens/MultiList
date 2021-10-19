from django.urls import path

from .views.film_view import GetFilm, PostFilm, PutFilm
from .views.series_view import GetSeries, PostSeries, PutSeries
from .views.user_view import GetUser, PostUser, PutUser

app_name = 'Api'

urlpatterns = [
    path('post-film', PostFilm.as_view()),
    path('put-film', PutFilm.as_view()),
    path('get-film', GetFilm.as_view()),
    path('post-series', PostSeries.as_view()),
    path('put-series', PutSeries.as_view()),
    path('get-series', GetSeries.as_view()),
    path('get-user', GetUser.as_view()),
    path('post-user', PostUser.as_view()),
    path('put-user', PutUser.as_view()),
]


