from rest_framework.views import APIView
from rest_framework import authtoken, status
from rest_framework.response import Response
from django.forms.models import model_to_dict

# Local
from ..utils import create_token
from ..models import MultimediaContent, Progress, User, Category
import global_variables as gv

import json


class GetUser(APIView):
    def get(self, request, format=None):
        """Returns User if existing"""
        obj = User.objects.get(id=request.GET[gv.USER.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class GetUsersByName(APIView):
    def get(self, request, format=None):
        obj = User.objects.filter(username__icontains=request.GET[gv.USER.USERNAME])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        print("ITEM", obj)
        content_list = [User.objects.get(id=i.id) for i in obj]
        print("LIST", content_list)
        return Response(json.dumps([model_to_dict(item) for item in content_list]))

class UpdateFollows(APIView):
    def post(self, request, format=None):
        obj = User.objects.get(id=request.data[gv.COMMON.ID])
        followId = request.data['follow_id']
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        if obj.following is None:
            string_json = '{"users":[]}'
        else:
            string_json = obj.following
        content_json = json.loads(string_json)
        print("DATA ANTES", content_json["users"])
        if followId not in content_json["users"] :
            content_json["users"].append(followId)
        string_json = json.dumps(content_json)
        print("DATA DESPUES", string_json)
        User.objects.update_or_create(id = obj.id, defaults={
            gv.USER.FOLLOWING: string_json
        })
        obj = User.objects.get(id = request.data[gv.COMMON.ID])
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class DeleteFollows(APIView):
    def post(self, request, format=None):
        obj = User.objects.get(id=request.data[gv.COMMON.ID])
        followId = request.data['follow_id']
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        if obj.following is None:
            string_json = '{"users":[]}'
        else:
            string_json = obj.following
        content_json = json.loads(string_json)
        print("DATA ANTES", content_json["users"])
        if followId in content_json["users"] :
            content_json["users"].remove(followId)
        string_json = json.dumps(content_json)
        print("DATA DESPUES", string_json)
        User.objects.update_or_create(id = obj.id, defaults={
            gv.USER.FOLLOWING: string_json
        })
        obj = User.objects.get(id = request.data[gv.COMMON.ID])
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class PostUser(APIView):
    def post(self, request, format=None):
        """Creates and return a User Model"""
        data = request.data[gv.COMMON.CONTENT]
        obj = User.objects.create(
            username=data[gv.USER.USERNAME],
            password=data[gv.USER.PASSWORD],
            email=data[gv.USER.EMAIL],
        )
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class PutUser(APIView):
    def put(self, request, format=None):
        """Updates an existing user"""
        obj = User.objects.get(id=request.GET[gv.COMMON.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.username = request.data[gv.USER.USERNAME]
        obj.password = request.data[gv.USER.PASSWORD]
        obj.email = request.data[gv.USER.EMAIL]
        obj.spotify_token = request.data[gv.USER.SPOTIFY_TOKEN]
        obj.lists = request.data[gv.USER.LISTS]

class GetUserArray(APIView):
    def post(self, request, format=None):
        obj = request.data["list"]
        print("ITEM", obj)
        content_list = [User.objects.get(id=i) for i in obj]
        print("LIST", content_list)
        return Response(json.dumps([model_to_dict(item) for item in content_list]))

class UpdateUserLists(APIView):
    def post(self, request, format=None):
        obj = User.objects.get(id=request.GET[gv.USER.ID])
        listId = request.GET['list_id']
        listIdInt = int(listId)
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        string_json = obj.lists
        content_json = json.loads(string_json)
        if listIdInt not in content_json :
            content_json.append(listIdInt)
        string_json = json.dumps(content_json)
        User.objects.update_or_create(id = obj.id, defaults={
            gv.USER.LISTS: string_json
        })
        obj = User.objects.get(id=request.GET[gv.USER.ID])
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)

class UpdateUserCategories(APIView):
    def post(self, request, format=None):
        user = User.objects.get(id=request.GET[gv.USER.ID])
        category = Category.objects.get(name=request.GET[gv.CATEGORY.NAME], type=request.GET[gv.CATEGORY.TYPE])
        categoryId = category.id
        categoryIdInt = int(categoryId) #Hasta aquí está bien, se obtiene bien la categoria
        if user is None:
            return Response(model_to_dict(user), status=status.HTTP_204_NO_CONTENT)
        
        if(user.categories):
            print('la lista no es nula')
            string_json = user.categories
            content_json = json.loads(string_json)
            if categoryIdInt not in content_json :
                content_json.append(categoryIdInt)
                string_json = json.dumps(content_json)
        else:
            string_json = [categoryIdInt]

        User.objects.update_or_create(id = user.id, defaults={
            gv.USER.CATEGORIES: string_json
        })
        user = User.objects.get(id=request.GET[gv.USER.ID])
        return Response(model_to_dict(user), status=status.HTTP_200_OK)

class GetStatisticsFromUser(APIView):
    def get(self, request, format=None):
        """Returns a list of tuples in format {type_of_content, state} for frontend processing"""
        progress_list = Progress.objects.filter(user_id=request.GET[gv.USER.ID])
        returned_array = [
            (prog.state,
             MultimediaContent.objects.get(external_id=prog.content_id).type)
             for prog in progress_list]
        return Response(json.dumps(returned_array), status=status.HTTP_200_OK)               
