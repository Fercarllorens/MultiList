from django.urls import path
from .views import GetById, GetByQuery, GetMovie, GetPeople, GetShow, GetMovieCredits, GetShowCredits

urlpatterns = [
    path("get-by-id", GetById.as_view()),
    path("search", GetByQuery.as_view()),
    path("get-film", GetMovie.as_view()),
    path("get-people", GetPeople.as_view()),
    path("get-show", GetShow.as_view()),
    path("get-film-credits", GetMovieCredits.as_view()),
    path("get-show-credits", GetShowCredits.as_view()),
]