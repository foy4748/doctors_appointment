from django.shortcuts import render

from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from .serializers import BookingSerializer , TimeSlotSerializer

from .models import Booking, TimeSlot

from rest_framework import permissions, authentication

# Create your views here.
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    # For querying using url parameters
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'date': ['exact', 'gte', 'lte'],
    }
    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        serializer.validate(data=request.data)
        if serializer.is_valid():
            booking = Booking.objects.create(user=request.user,time_slot=request.data.time_slot,date=request.data.date)
            booking.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
