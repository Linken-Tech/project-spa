from django.db import models
from django.contrib.auth.models import User
from utils.choices import FeedbackStatus

# Create your models here.


class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=FeedbackStatus.choices,
        default=FeedbackStatus.ACTIVE,
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user + '-' + self.title}"
