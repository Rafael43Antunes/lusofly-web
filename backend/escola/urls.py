from django.urls import path
from .views import AeronaveListAPIView, AeronaveDetailAPIView

urlpatterns = [
    path('frota/', AeronaveListAPIView.as_view(), name='api-frota'),
    path('frota/<int:pk>/', AeronaveDetailAPIView.as_view(), name='api-frota-detalhe'),
]