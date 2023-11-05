from rest_framework import generics, status
from rest_framework.decorators import schema
from rest_framework.response import Response

from django.conf import settings

# Create your views here.
@schema(None)
class ApiVersioningView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        return Response(
            {"version": settings.API_VERSION}, status=status.HTTP_200_OK
        )
    

@schema(None)
class HealthCheckView(generics.GenericAPIView):
    def get(self, request):
        return Response(status=status.HTTP_200_OK)