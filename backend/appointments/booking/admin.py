from django.contrib import admin
from .models import Booking, TimeSlot

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'time_slot', 'date')

@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('time_range',)
