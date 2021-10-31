from django.db import models

# Create your models here.
class User(models.Model):    
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    spotify_token = models.CharField(max_length=300, unique=True, null=True)
    lists = models.TextField(null=True)


class MultimediaContent (models.Model):
    name = models.CharField(max_length=300, null=True)
    type = models.CharField(max_length=50)
    external_id = models.CharField(max_length=300, unique=True)
    total_rating = models.IntegerField(null=True)
    comments = models.TextField(null=True)


class Comment (models.Model):
    user_id = models.CharField(max_length=300)
    content_id = models.CharField(max_length=300)
    comment = models.CharField(max_length=300, null=True)
    rating = models.IntegerField(null=True)
    likes = models.TextField(null=True) #Array of user_ids that have liked this post
    dislikes = models.TextField(null=True) #Array of user_ids that have disliked this post


class List (models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    contents = models.CharField(max_length=500)
    user_id = models.CharField(max_length=300)


class Progress(models.Model):
    user_id = models.CharField(max_length=300)
    content_id = models.CharField(max_length=300)
    state = models.CharField(max_length=300)
    progress = models.CharField(max_length=300)


class Film (models.Model):
    external_id = models.CharField(max_length=300, unique=True)
    name = models.CharField(max_length=300, null=True)


class Series (models.Model):
    external_id = models.CharField(max_length=300, unique=True)
    name = models.CharField(max_length=300, null=True)
    

class Song (models.Model):
    external_id = models.CharField(max_length=300, unique=True)
    name = models.CharField(max_length=300, null=True)
