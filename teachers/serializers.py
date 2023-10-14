from rest_framework import serializers
from .models import Teacher
from students.serializers import StudentSerializer


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'name', 'students', 'created_at']
