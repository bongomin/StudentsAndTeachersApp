from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer

class StudentModelTests(TestCase):
    def setUp(self):
        self.student_data = {
            'name': 'Jane',
            'surname': 'Ouma'
        }

    def test_create_student(self):
        student = Student.objects.create(**self.student_data)
        self.assertEqual(student.name, self.student_data['name'])
        self.assertEqual(student.surname, self.student_data['surname'])
        self.assertIsNotNone(student.created_at)
        self.assertIsNotNone(student.updated_at)

    def test_student_str_method(self):
        student = Student.objects.create(**self.student_data)
        expected_str = f"{student.surname}"
        self.assertEqual(str(student), expected_str)

class StudentSerializerTests(TestCase):
    def test_serializer_valid_data(self):
        valid_data = {
            'id': '123e4567-e89b-12d3-a456-426614174001',
            'name': 'Bongomin',
            'surname': 'Daniel',
            'created_at': '2023-10-14T12:34:56.789012Z'
        }
        serializer = StudentSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())
    
    def test_serializer_invalid_data(self):
        invalid_data = {
            'name': 'Akena',
            'surname': 'James'
        }
        serializer = StudentSerializer(data=invalid_data)
        self.assertTrue(serializer.is_valid())

class StudentViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student_data = {
            'name': 'Bongomin',
            'surname': 'Ddaniel'
        }
        self.student = Student.objects.create(**self.student_data)

    def test_retrieve_student(self):
        url = reverse('student-detail', kwargs={'pk': self.student.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = StudentSerializer(self.student).data
        self.assertEqual(response.data, expected_data)

    def test_create_student(self):
        url = reverse('student-list')
        response = self.client.post(url, self.student_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], self.student_data['name'])

    def test_update_student(self):
        updated_name = 'Updated Name'
        url = reverse('student-detail', kwargs={'pk': self.student.id})
        updated_data = self.student_data.copy()
        updated_data['name'] = updated_name
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], updated_name)

    def test_delete_student(self):
        url = reverse('student-detail', kwargs={'pk': self.student.id})
        response = self.client.delete(url)
        self.assertFalse(Student.objects.filter(id=self.student.id).exists())
