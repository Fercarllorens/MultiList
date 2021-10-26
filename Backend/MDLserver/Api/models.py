from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.
class User(models.Model):    
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    spotify_token = models.CharField(max_length=300, unique=True, null=True)
    lists = models.TextField(null=True)

class Film (models.Model):
    external_id = models.CharField(max_length=300, unique=True)

class Series (models.Model):
    external_id = models.CharField(max_length=300, unique=True)

class Song (models.Model):
    external_id = models.CharField(max_length=300, unique=True)
