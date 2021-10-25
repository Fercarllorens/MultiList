from django.db import models
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):    
    def create_user(self, username, email, password):
        user = self.model(
            username = username,
            email = email,
            password = password
        )
        
        user.save(using=self.db)

        return user