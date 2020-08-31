from rest_framework.test import APITestCase, APIClient
from knox.models import AuthToken
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.test import force_authenticate
from rest_framework.test import APIRequestFactory

# Using the standard RequestFactory API to create a form POST request


class HomePageAPITest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='test', email='user@foo.com', password='top_secret')

    def test_post_with_auth(self):
        self.client.force_authenticate(self.user)
        request = self.client.post('/api/homepage/', {'title': 'test title', 'content': 'test content'})
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)

    def test_post_without_auth(self):
        request = self.client.post('/api/homepage/', {'title': 'test title', 'content': 'test content'})
        self.assertEqual(request.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_homepage_get(self):
        request = self.client.get('/api/homepage/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_homepage_delete_with_auth(self):
        self.client.force_authenticate(self.user)
        self.data = self.client.post('/api/homepage/', {'title': 'test title', 'content': 'test content'})
        url = reverse('homepage-detail', kwargs={'pk': self.data.pk})
        request = self.client.delete(url)
        self.assertEqual(request.status_code, status.HTTP_200_OK)
