from django.shortcuts import render

# Create your views here.

# work on the crud logic and views
"""
can refer this documentation
https://www.django-rest-framework.org/tutorial/3-class-based-views/

"""
from feedback.models import Feedback
from rest_framework import generics
from feedback import serializers as feedback_srlz


class FeedbackList(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = feedback_srlz.FeedbackSerializer


class FeedbackDetails(generics.RetrieveUpdateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = feedback_srlz.FeedbackSerializer
