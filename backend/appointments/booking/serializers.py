from rest_framework import  serializers
from .models import Booking, TimeSlot

class BookingSerializer(serializers.ModelSerializer):
    time_slot = serializers.IntegerField()
    date = serializers.DateField(required=True)
    class Meta:
        model = Booking
        fields = ['time_slot', 'date']

    def validate(self, request):
        time_slot = request.get('time_slot')
        date = request.get('date')
        print(time_slot, date)
        # Check if there is already a booking for the same user and date
        existing_booking = Booking.objects.filter(time_slot=time_slot, date=date).exists()
        if existing_booking:
            print("INVALID")
            raise serializers.ValidationError("A booking for this date already exists.")

        return request

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'
