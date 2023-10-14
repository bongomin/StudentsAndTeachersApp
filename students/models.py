from django.db import models
from base_resources.models_base_resource import ModelsBaseResource


class Student(ModelsBaseResource):
    surname = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.surname}"

