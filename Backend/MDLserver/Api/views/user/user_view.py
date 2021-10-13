from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
# Local
from ...models import User
import global_variables as gv


class UserController(APIView):
    def get(self, request, format=None):
        """Returns User if existing"""
        obj = User.objects.get(id=request.POST[gv.COMMON.ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        return Response({obj}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        """Creates and return a User Model"""
        data = request.POST[gv.COMMON.CONTENT]
        obj = User.objects.create(
            username=data[gv.USER.username],
            password=data[gv.USER.PASSWORD],
            email=data[gv.USER.EMAIL],   
        )
        return Response({obj}, status=status.HTTP_200_OK)

    def put(self, request, format=None):
        """Updates an existing user"""
        obj = User.objects.get(id=request.POST[gv.COMMON.ID])
        if obj is None:
            return Response({obj}, status=status.HTTP_204_NO_CONTENT)
        obj.username = request.POST[gv.USER.USERNAME]
        obj.password = request.POST[gv.USER.PASSWORD]
        obj.email = request.POST[gv.USER.EMAIL]
        obj.spotify_token = request.POST[gv.USER.SPOTIFY_TOKEN]
        obj.lists = request.POST[gv.USER.LISTS]