from django.shortcuts import render
from rest_framework import generics
from .models import Aeronave
from .serializers import AeronaveSerializer

# Create your views here.

class AeronaveListAPIView(generics.ListAPIView):
    # O filtro garante que o Next.js só recebe aviões que estejam marcados como "ativos"
    queryset = Aeronave.objects.filter(ativo=True)
    serializer_class = AeronaveSerializer

class AeronaveDetailAPIView(generics.RetrieveAPIView):
    queryset = Aeronave.objects.filter(ativo=True)
    serializer_class = AeronaveSerializer