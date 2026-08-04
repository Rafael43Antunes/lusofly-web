from rest_framework import serializers
from .models import Aeronave, ImagemAeronave

# Serializer para as imagens da galeria
class ImagemAeronaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagemAeronave
        fields = ['id', 'imagem', 'legenda']

# Serializer principal do Avião
class AeronaveSerializer(serializers.ModelSerializer):
    # 'galeria' é o related_name que definimos no models.py. 
    galeria = ImagemAeronaveSerializer(many=True, read_only=True)

    class Meta:
        model = Aeronave
        fields = '__all__' 