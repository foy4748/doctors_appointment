from rest_framework import  serializers
from .models import Booking, TimeSlot

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['time_slot', 'date']

    def validate(self, data):
        date = data.get('date')
        time_slot = data.get('time_slot')
        user = data.get('user')
        print('-------------------Found Data--------------------')
        print(date, time_slot, user)

        # Check if there is already a booking for the same user and date
        existing_booking = Booking.objects.filter(time_slot=time_slot, date=date).exists()
        if existing_booking:
            raise serializers.ValidationError("A booking for this date already exists.")

        return data

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'
