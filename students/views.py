from django.core.cache import cache
from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from base_resources.pagination import CustomPageNumberPagination

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
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
        deleted_student_data = {
            'name': instance.name,
            'surname': instance.surname
        }
        self.perform_destroy(instance)

        # Invalidate the cache for the deleted student
        # this is to avoid showing deleted students info
        cache_key = f"student_{kwargs['pk']}"
        cache.delete(cache_key)

        return Response({'message': 'Student deleted successfully.', 'deleted_student': deleted_student_data})

    def retrieve(self, request, *args, **kwargs):
        # Check if data is in cache
        cache_key = f"student_{kwargs['pk']}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)

        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        # Cache the data for future requests
        cache.set(cache_key, data)
        return Response(data)
