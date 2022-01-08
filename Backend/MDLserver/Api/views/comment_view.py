from django.shortcuts import render, redirect
import json

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict

import global_variables as gv
from ..models import Comment, MultimediaContent

# Create your views here.
class PostComment(APIView):
    def post(self, request, format=None):
        data = request.data
        obj, created = Comment.objects.get_or_create(
                    user_id = data.get(gv.COMMENT.USER_ID),
                    content_id = data.get(gv.COMMENT.CONTENT_ID), defaults={
                        gv.COMMENT.COMMENT: data.get(gv.COMMENT.COMMENT),
                        gv.COMMENT.RATING: data.get(gv.COMMENT.RATING),
                        gv.COMMENT.LIKES: '[]',
                        gv.COMMENT.DISLIKES: '[]',
                    }
            )
        if created:
            calculate_total_rating(data.get(gv.COMMENT.CONTENT_ID))
            return Response(model_to_dict(obj), status=status.HTTP_201_CREATED)
        return Response({gv.COMMON.ERROR: "User already comented this post"}, status=status.HTTP_400_BAD_REQUEST)
        
        
#All components of the item are required to update it!!
class PutComment(APIView):
    def put(self, request, format=None):
        obj = Comment.objects.get(id = request.data[gv.COMMON.ID])
        if obj is None:
            return Response(model_to_dict(obj), status=status.HTTP_204_NO_CONTENT)
        obj.user_id = request.data[gv.COMMENT.USER_ID]
        obj.content_id = request.data[gv.COMMENT.CONTENT_ID]
        obj.comment = request.data[gv.COMMENT.COMMENT]
        obj.rating = request.data[gv.COMMENT.RATING]
        obj.likes = request.data[gv.COMMENT.LIKES]
        obj.dislikes = request.data[gv.COMMENT.DISLIKES]
        obj.save()
        return Response(model_to_dict(obj), status=status.HTTP_200_OK)


class GetComment(APIView):
    def get(self, request, format=None):
        try:
            obj = Comment.objects.get(id=request.GET[gv.COMMON.ID])
            return Response(model_to_dict(obj), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({gv.COMMON.ERROR: "Item does not exists"}, status=status.HTTP_204_NO_CONTENT)

class GetAllUserComments(APIView):
    def get(self, request, format=None):
        try:
            objs = Comment.objects.filter(user_id=request.GET[gv.COMMON.ID])
            return Response(model_to_dict(objs), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({gv.COMMON.ERROR: "Item not found"}, status=status.HTTP_204_NO_CONTENT)


class GetAllContentComments(APIView):
    def get(self, request, format=None):
        try:
            objs = Comment.objects.filter(content_id=request.GET[gv.COMMON.ID])
            return Response(json.dumps([model_to_dict(i) for i in objs]), status=status.HTTP_200_OK)
        except:
            return Response({gv.COMMON.ERROR: "Error ocurred"}, status=status.HTTP_204_NO_CONTENT)
   
    
def calculate_total_rating(content_id: str):
    item = MultimediaContent.objects.get(external_id=content_id)
    item_comments = Comment.objects.filter(content_id=content_id)
    ratings = [rat.rating for rat in item_comments]
    new_rating = (sum(ratings)/len(ratings))*20
    item.total_rating = new_rating
    item.save()
