# from io import StringIO
from vehicle.models import Vehicle, VehicleBrand, VehicleDocument
from rest_framework import generics
from vehicle import serializers as vehicle_srlz
from django.utils import timezone 
import os
import zipfile
from django.http import HttpResponse
from core import settings
import io

# Vehicle Brand Here
class BrandList(generics.ListCreateAPIView):
    """
    Create New Brand
    View All Brand in a List
    """
    queryset = VehicleBrand.objects.exclude(removed__isnull=False)
    serializer_class = vehicle_srlz.VehicleBrandSerializer

class BrandDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    View Brand Details
    Update Brand Details
    Delete Brand
    """
    queryset = VehicleBrand.objects.all()
    serializer_class = vehicle_srlz.VehicleBrandSerializer

    def perform_destroy(self, instance):
        instance.removed = timezone.now()
        return instance.save()

# Vehicle Here
class VehicleList(generics.ListCreateAPIView):
    """
    Create New Car
    View All Car in a List
    """
    queryset = Vehicle.objects.exclude(removed__isnull=False)
    serializer_class = vehicle_srlz.VehicleSerializer

class VehicleDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    View Car Details
    Update Car Details
    Delete Car
    """
    queryset = Vehicle.objects.all()
    serializer_class = vehicle_srlz.VehicleSerializer

    def perform_destroy(self, instance):
        queryset_doc = instance.documents.filter(vehicle_id=instance)
        queryset_images = instance.vehicle_image.filter(vehicle_id=instance)
        queryset_doc.update(removed=timezone.now())
        queryset_images.update(removed=timezone.now())
        instance.removed = timezone.now()
        return instance.save()

class DownloadVehicleDocuments(generics.RetrieveAPIView):
    queryset = VehicleDocument.objects.all()
    serializer_class = vehicle_srlz.DownloadVehicleDocumentSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().values('vehicle', 'document')
        files = []

        for filenames in queryset:
            get_vehicle = Vehicle.objects.filter(id=filenames.get('vehicle')).first()
            file_format = os.path.join(settings.MEDIA_ROOT, filenames.get('document'))
            files.append(file_format)

        zip_subdir = "%s-%s" % (get_vehicle.vehicle,get_vehicle.vehicle_brand)
        zip_filename = "%s.zip" % zip_subdir

        s = io.BytesIO()
        zf = zipfile.ZipFile(s, "w")

        for fpath in files:
            fdir, fname = os.path.split(fpath)
            zip_path = os.path.join(zip_subdir, fname)

            zf.write(fpath, zip_path)
        zf.close()

        response = HttpResponse(s.getvalue(), content_type = "application/x-zip-compressed")
        response['Content-Disposition'] = 'attachment; filename=%s' % zip_filename

        return response
