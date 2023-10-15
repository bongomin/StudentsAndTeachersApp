from django.db import models
from base_resources.models_base_resource import ModelsBaseResource
from students.models import Student


class Teacher(ModelsBaseResource):
    students = models.ManyToManyField(Student, null=True, blank=True)


    def __str__(self):
        return self.name
