import json

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import DemandPattern, Game, Instructor, Player, User
from .serializers import (DemandPatternSerializer, GameSerializer,
                          InstructorSerializer, PlayerSerializer,
                          UserLoginSerializer, UserSerializer,
                          UserSignUpSerializer)


class UserSignUpTestCase(APITestCase):

    def test_registration(self):
        data = {"username" : "testcase", "email": "test@localhost.com", "password" : "testpassword", "role": 3}
        response = self.client.post("/api/signup/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class UserLogInTestCase(APITestCase):

    def setUp(self):
        user = User.objects.create_user(email="test1@localhost.com", password= "testpassword1")

    def test_login(self):
        data = {"email": "test1@localhost.com", "password" : "testpassword1"}
        response = self.client.post("/api/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AuthGameListTestCase(APITestCase):
    # Set up before each test

    def setUp(self):
        self.user = User.objects.create_user(email="test2@localhost.com", password= "testpassword2")
    
    #testing for unauthenticated user
    def test_unauth_gamelist(self):
        request = self.client.get('/api/games/')
        self.assertEqual(request.status_code, status.HTTP_401_UNAUTHORIZED)

    #testing for authenticated user
    def test_auth_gamelist(self):
        self.client.force_authenticate(user=self.user)
        request = self.client.get('/api/games/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)


class DemandPatternAPITestCase(APITestCase):
    # Set up before each test
    def setUp(self):
        pass

    def test_GET_demand_pattern(self):
        pass

    def test_GET_ALL_demand_patterns(self):
        pass

    def test_POST_demand_pattern_success(self):
        pass

    def test_POST_demand_pattern_failure(self):
        pass

    def test_PATCH_demand_pattern_success(self):
        pass

    def test_PATCH_demand_pattern_failure(self):
        pass

    def test_DELETE_demand_pattern_success(self):
        pass

    def test_DELETE_demand_pattern_failure(self):
        pass
