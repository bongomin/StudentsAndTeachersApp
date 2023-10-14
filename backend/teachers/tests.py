from django.urls import reverse
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Teacher
from students.models import Student
from .serializers import TeacherSerializer

class TeacherViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.teacher_data = {
            'name': 'John Doe'
        }
        self.teacher = Teacher.objects.create(**self.teacher_data)

    def test_retrieve_teacher(self):
        url = reverse('teacher-detail', kwargs={'pk': self.teacher.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = TeacherSerializer(self.teacher).data
        self.assertEqual(response.data, expected_data)

    def test_create_teacher(self):
        url = reverse('teacher-list')
        response = self.client.post(url, self.teacher_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], self.teacher_data['name'])

    def test_update_teacher(self):
        updated_name = 'Updated Name'
        url = reverse('teacher-detail', kwargs={'pk': self.teacher.id})
        updated_data = self.teacher_data.copy()
        updated_data['name'] = updated_name
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], updated_name)

    def test_delete_teacher(self):
        url = reverse('teacher-detail', kwargs={'pk': self.teacher.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Teacher.objects.filter(id=self.teacher.id).exists())
