from django.urls import path
from .views.list_view import GetList, PostList, PutList, UpdateListContents, UpdateListContents, GetListByUser
from .views.film_view import GetFilm, PostFilm, PutFilm
from .views.series_view import GetSeries, PostSeries, PutSeries
from .views.song_view import GetSong, PostSong, PutSong
from .views.user_view import GetUser, PostUser, PutUser
from .views.progress_view import GetProgress, PostProgress, UpdateProgress

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
    path('get-list-user', GetListByUser.as_view()),
    path('put-list', PutList.as_view()),
    path('update-list', UpdateListContents.as_view()),

    path('post-song', PostSong.as_view()),
    path('put-song', PutSong.as_view()),
    path('get-song', GetSong.as_view()),

    path('get-user', GetUser.as_view()),
    path('post-user', PostUser.as_view()),
    path('put-user', PutUser.as_view()),

    path('get-progress', GetProgress.as_view()),
    path('post-progress', PostProgress.as_view()),
    path('update-progress', UpdateProgress.as_view())
]


