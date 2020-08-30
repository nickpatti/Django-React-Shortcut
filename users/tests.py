from rest_framework.authtoken.models import Token
from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase
from rest_framework.test import force_authenticate
from django.contrib.auth.models import User
from .api import LoginAPI, RegisterAPI, UserAPI


class LoginAPITest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
            username='user@foo.com', email='user@foo.com', password='top_secret')
        self.token = Token.objects.create(user=self.user)
        self.token.save()

    def test_token_auth(self):
        request = self.factory.post('/api/auth/login', {'username': 'user@foo.com', 'email': 'user@foo.com', 'password': 'top_secret'})
        # force_authenticate(request, token=self.token.key)
        view = LoginAPI.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)
        # json_response = json.loads(response.render().content)['results']
