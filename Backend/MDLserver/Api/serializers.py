# Django
from django.contrib.auth import password_validation, authenticate

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token

#Local
from .models import User

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'email',
        )

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=30)

    def validate(self, data):
        user = authenticate(email = data['email'], password = data['password'])

        if not user:
            raise serializers.ValidationError('The given credentials are not valid.')
        
        self.context['user'] = user

        return data

    def create(self, data):
        token, created = Token.objects.get_or_create(user = self.context['user'])
        return self.context['user'], token.key

class UserSignUpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length = 30)
    password = serializers.CharField(max_length = 30)

    def create(self, data):
        user = User.objects.create_user(**data)
        return user