from django.urls import path
from .views import GetById, GetByQuery

urlpatterns = [
    path("get-by-id", GetById.as_view()),
    path("search", GetByQuery.as_view()),
]