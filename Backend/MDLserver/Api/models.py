from django.db import models

# Create your models here.
class Film (models.Model):
    external_id = models.CharField(max_length=300, unique=True)

class Series (models.Model):
    external_id = models.CharField(max_length=300, unique=True)
    