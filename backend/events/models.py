from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class Event(models.Model):
    title: str = models.CharField(max_length=50)
    description: str = models.TextField()
    date: str = models.DateField()
    location: str = models.CharField(max_length=150)
    author: str = models.ForeignKey(User, on_delete=models.CASCADE,
                                    related_name='organaized_event')

    def __str__(self):
        return self.title


User = get_user_model()


class EventRegistration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey("Event", on_delete=models.CASCADE,
                              related_name="registrations")
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'event')

    def __str__(self):
        return f'{self.user.username} registered on {self.event.title}'
