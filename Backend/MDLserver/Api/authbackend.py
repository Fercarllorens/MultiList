from .models import User
from django.contrib.auth.backends import ModelBackend

class AuthBackend(ModelBackend):
    def authenticate(email = None, password = None, **kwargs):
        try:
            user = User.objects.get(email = email)
        except User.DoesNotExist:
            return None
        else:
            return user if user.password == password else None
