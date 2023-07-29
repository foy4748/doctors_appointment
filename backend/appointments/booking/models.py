from django.db import models
from django.contrib.auth.models import User

class TimeSlot(models.Model):
    # Define fields for the TimeSlot model
    time_range = models.CharField(max_length=400)

    def __str__(self):
        return self.time_range

class Booking(models.Model):
    # Foreign key to the Django User model
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Foreign key to the TimeSlot model
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)

    # DateField for the date
    date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.time_slot} - {self.date}"

