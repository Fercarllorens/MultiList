from django.urls import path
from .views.list_view import GetList, PostList, PutList, UpdateListContents, UpdateListContents, GetListByUser, DeleteListContents
from .views.film_view import GetFilm, PostFilm, PutFilm
from .views.series_view import GetSeries, PostSeries, PutSeries
from .views.song_view import GetSong, PostSong, PutSong
from .views.user_view import GetUser, PostUser, PutUser, GetUsersByName
from .views.content_view import GetContent, PostContent, PutContent, GetContentArray
from .views.progress_view import GetProgress, PostProgress, UpdateProgress
from .views.comment_view import GetComment, PostComment, PutComment, GetAllUserComments, GetAllContentComments
from .views.auth_view import Login, Register


app_name = 'Api'

urlpatterns = [
    path('post-film', PostFilm.as_view()),
    path('put-film', PutFilm.as_view()),
    path('get-film', GetFilm.as_view()),
    
    path('post-series', PostSeries.as_view()),
    path('put-series', PutSeries.as_view()),
    path('get-series', GetSeries.as_view()),


    path('post-song', PostSong.as_view()),
    path('put-song', PutSong.as_view()),
    path('get-song', GetSong.as_view()),

    path('post-content', PostContent.as_view()),
    path('put-content', PutContent.as_view()),
    path('get-content', GetContent.as_view()),
    path('get-content-array', GetContentArray.as_view()),

    path('post-comment', PostComment.as_view()),
    path('put-comment', PutComment.as_view()),
    path('get-comment', GetComment.as_view()),
    path('get-user-comments', GetAllUserComments.as_view()),
    path('get-content-comments', GetAllContentComments.as_view()),

    path('post-list', PostList.as_view()),
    path('get-list', GetList.as_view()),
    path('get-list-user', GetListByUser.as_view()),
    path('delete-list', DeleteListContents.as_view()),
    path('put-list', PutList.as_view()),
    path('update-list', UpdateListContents.as_view()),

    path('get-user', GetUser.as_view()),
    path('get-users-name', GetUsersByName.as_view()),
    path('post-user', PostUser.as_view()),
    path('put-user', PutUser.as_view()),

    path('get-progress', GetProgress.as_view()),
    path('post-progress', PostProgress.as_view()),
    path('update-progress', UpdateProgress.as_view()),
    
    path('login', Login.as_view()),
    path('register', Register.as_view()),
]


