from django.urls import path

from .views.list_view import GetList, PostList, PutList, UpdateListContents, UpdateListContents

from .views.film_view import GetFilm, PostFilm, PutFilm
from .views.series_view import GetSeries, PostSeries, PutSeries

app_name = 'Api'

urlpatterns = [
    path('post-film', PostFilm.as_view()),
    path('put-film', PutFilm.as_view()),
    path('get-film', GetFilm.as_view()),
    path('post-series', PostSeries.as_view()),
    path('put-series', PutSeries.as_view()),
    path('get-series', GetSeries.as_view()),
    path('post-list', PostList.as_view()),
    path('get-list', GetList.as_view()),
    path('put-list', PutList.as_view()),
    path('update-list', UpdateListContents.as_view())
]


