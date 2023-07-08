from django.db import models


class FeedbackStatus(models.TextChoices):
    PENDING = "PEN"
    NOT_ACTIVE = "NOT ACTIVE"
    ACTIVE = "ACTIVE"
