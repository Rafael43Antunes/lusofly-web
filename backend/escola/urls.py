from django.urls import path
from .views import AeronaveListAPIView

urlpatterns = [
    path('frota/', AeronaveListAPIView.as_view(), name='api-frota'),
]