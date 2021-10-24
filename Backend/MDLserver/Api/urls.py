from django.urls import path
app_name = 'Api'

from .views.film_view import GetFilm, PostFilm, PutFilm
from .views.series_view import GetSeries, PostSeries, PutSeries
from .views.user_view import GetUser, PostUser, PutUser
from .views.auth_view import Login, Register

app_name = 'Api'

urlpatterns = [
    path('post-film', PostFilm.as_view()),
    path('put-film', PutFilm.as_view()),
    path('get-film', GetFilm.as_view()),
    path('post-series', PostSeries.as_view()),
    path('put-series', PutSeries.as_view()),
    path('get-series', GetSeries.as_view()),
    path('post-song', PostSeries.as_view()),
    path('put-song', PutSeries.as_view()),
    path('get-song', GetSeries.as_view()),
    path('get-user', GetUser.as_view()),
    path('post-user', PostUser.as_view()),
    path('put-user', PutUser.as_view()),
    path('login', Login.as_view()),
    path('register', Register.as_view()),
]


