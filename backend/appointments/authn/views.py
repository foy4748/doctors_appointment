# Create your views here.
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserRegistrationSerializer,UserLoginSerializer
from rest_framework.authentication import TokenAuthentication

from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

from rest_framework import permissions

class UserRegistrationView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.create(clean_data=request.data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (TokenAuthentication,)
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.check_user(clean_data=request.data)
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
