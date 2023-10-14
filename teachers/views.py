from django.core.cache import cache
from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Teacher
from .serializers import TeacherSerializer
from base_resources.pagination import CustomPageNumberPagination
from rest_framework.decorators import action

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    pagination_class = CustomPageNumberPagination

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted_teacher_data = {
            'name': instance.name,
            # Add any other relevant teacher data to be returned
        }
        self.perform_destroy(instance)

        # Invalidate the cache for the deleted teacher
        # this is to avoid showing deleted teacher info
        cache_key = f"teacher_{kwargs['pk']}"
        cache.delete(cache_key)

        return Response({'message': 'Teacher deleted successfully.', 'deleted_teacher': deleted_teacher_data})

    @action(detail=True, methods=['post'], url_path='remove_students')
    @transaction.atomic
    def remove_students(self, request, pk=None):
        try:
            teacher = self.get_object()
            student_ids = request.data.get('student_ids', [])

            # Remove the specified students from the teacher
            teacher.students.remove(*student_ids)

            return Response({'message': 'Students removed from the teacher successfully.'})
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found.'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, *args, **kwargs):
        # Check if data is in cache
        cache_key = f"teacher_{kwargs['pk']}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)

        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        # Cache the data for future requests
        cache.set(cache_key, data)
        return Response(data)
