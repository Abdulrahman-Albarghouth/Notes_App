from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Note

class UserAndNoteTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpassword'
        }

    def test_user_workflow(self):
        
        response = self.client.post('/api/register/', self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        login_data = {
            'username': self.user_data['username'],
            'password': self.user_data['password']
        }
        response = self.client.post('/api/token/', login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        access_token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        new_user_data = {
            'username': 'newusername',
            'email': 'newemail@example.com',
        }
        response = self.client.patch('/api/profile/', new_user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], new_user_data['username'])
        self.assertEqual(response.data['email'], new_user_data['email'])

        password_data = {
            'old_password': self.user_data['password'],
            'new_password': 'newpassword'
        }
        response = self.client.post('/api/change-password/', password_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        login_data['password'] = password_data['new_password']
        response = self.client.post('/api/token/', login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_access_token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {new_access_token}')

        note_data = {
            'title': 'Test Note',
            'description': 'This is a test note with audio',
            'audio': 'data:audio/wav;base64,examplebase64data==',
        }
        response = self.client.post('/api/notes/', note_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        note_id = response.data['id']

        updated_note_data = {
            'title': 'Updated Note',
            'description': 'This note has been updated',
        }
        response = self.client.put(f'/api/notes/{note_id}/', updated_note_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], updated_note_data['title'])
        self.assertEqual(response.data['description'], updated_note_data['description'])

        response = self.client.delete(f'/api/notes/{note_id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        response = self.client.get(f'/api/notes/{note_id}/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
