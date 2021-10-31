from django.shortcuts import render, redirect

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.forms.models import model_to_dict

import global_variables as gv
from ..models import Comment;

# Create your views here.
class PostComment(APIView):
    def post(self, request, format=None):
        data = request.data
        try:
            obj = Comment.objects.create(
                    user_id = data.get(gv.COMMENT.USER_ID),
                    content_id = data.get(gv.COMMENT.CONTENT_ID),
                    comment = data.get(gv.COMMENT.COMMENT),
                    rating = data.get(gv.COMMENT.RATING),
                    likes = 0,
                    dislikes = 0,
            )   
            return Response(model_to_dict(obj), status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({gv.COMMON.ERROR: "Error with your request"}, status=status.HTTP_400_BAD_REQUEST)
        
        
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
            return Response(model_to_dict(objs), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({gv.COMMON.ERROR: "Item not found"}, status=status.HTTP_204_NO_CONTENT)
   
    
