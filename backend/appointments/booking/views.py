from django.shortcuts import render

from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from .serializers import BookingSerializer , TimeSlotSerializer

from .models import Booking, TimeSlot
from rest_framework.authtoken.models import Token

from rest_framework import permissions, authentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

# Create your views here.
class BookingViewSet(APIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    # For querying using url parameters
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'date': ['exact', 'gte', 'lte'],
    }

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if(serializer.is_valid()):
            try:
                time_slot = TimeSlot.objects.get(pk=request.data['time_slot'])
                booking = Booking.objects.create(user=request.user,time_slot=time_slot,date=request.data['date'])
                booking.save()
                return Response(request.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                raise e
            return Response({'error':True, 'message':'Invalid Time Slot'},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':True,'message':'Already Booked'}, status=status.HTTP_409_CONFLICT)


class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
