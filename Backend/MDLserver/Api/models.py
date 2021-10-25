from django.db import models

# Create your models here.
class Film (models.Model):
    external_id = models.CharField(max_length=300, unique=True)

class Series (models.Model):
    external_id = models.CharField(max_length=300, unique=True)
    
class List (models.Models):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    contents = models.CharField(max_length=500)
    user_id = models.CharField(max_length=300)