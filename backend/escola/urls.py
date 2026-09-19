from django.urls import path
from .views import AeronaveListAPIView, AeronaveDetailAPIView, CursoListView

urlpatterns = [
    path('frota/', AeronaveListAPIView.as_view(), name='api-frota'),
    path('frota/<int:pk>/', AeronaveDetailAPIView.as_view(), name='api-frota-detalhe'),
    path('cursos/', CursoListView.as_view(), name='cursos-list'),
]