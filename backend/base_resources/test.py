from django.test import TestCase
from django.utils import timezone
from students.models import Student


class ModelsBaseResourceTest(TestCase):

    def test_models_base_resource_creation(self):
        resource = Student.objects.create(name='Test Resource')
        self.assertIsNotNone(resource)
        self.assertEqual(resource.name, 'Test Resource')
        self.assertTrue(resource.id)
        self.assertTrue(resource.created_at)
        self.assertTrue(resource.updated_at)
        self.assertTrue(resource.created_at <= timezone.now())
        self.assertTrue(resource.updated_at <= timezone.now())
