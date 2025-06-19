from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
