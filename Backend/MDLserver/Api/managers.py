from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.hashers import make_password

class UserManager(BaseUserManager):    
    def create_user(self, username, email, password):
        user = self.model(
            username = username,
            email = email,
            password = make_password(password)
        )
        
        user.save(using = self.db)

        return user
