from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from feedback import views

urlpatterns = [
    # view feedback list and add feedback
    path("feedback/", views.FeedbackList.as_view()),
    # view and update feedback details with ID
    path("feedback/<pk>/", views.FeedbackDetails.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
