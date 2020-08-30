from home.models import HomePage
from rest_framework import viewsets, permissions
from .serializers import HomePageSerializer


class HomePageViewSet(viewsets.ModelViewSet):
    queryset = HomePage.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = HomePageSerializer
