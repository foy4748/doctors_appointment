from rest_framework import  serializers
from .models import Booking, TimeSlot
from rest_framework.validators import UniqueForDateValidator

class BookingSerializer(serializers.ModelSerializer):
    time_slot = serializers.IntegerField(required=True)
    date = serializers.DateField(required=True)
    class Meta:
        model = Booking
        fields = ['time_slot', 'date']
        validators = [
                UniqueForDateValidator(
                    queryset = Booking.objects.all(),
                    field = 'time_slot',
                    date_field = 'date'
                    )
                ]

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'
