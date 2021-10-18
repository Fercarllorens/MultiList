from django.urls import path
from .views.user_view import GetUser, PostUser, PutUser
app_name = 'Api'

urlpatterns = [
    path("get-user", GetUser.as_view()),
    path("create-user", PostUser.as_view()),
    path("update-user", PutUser.as_view()),
]