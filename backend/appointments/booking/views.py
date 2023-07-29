from django.shortcuts import render

from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from .serializers import BookingSerializer , TimeSlotSerializer

from .models import Booking, TimeSlot

# Create your views here.
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    # For querying using url parameters
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'date': ['exact', 'gte', 'lte'],
    }

class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
