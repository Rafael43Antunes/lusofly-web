from rest_framework import serializers
from .models import Aeronave, ImagemAeronave
from .models import Curso, EtapaCurso, Testemunho, Carreira
from .models import Candidatura

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

class EtapaCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EtapaCurso
        fields = '__all__'

class TestemunhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testemunho
        fields = '__all__'

class CarreiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carreira
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    etapas = EtapaCursoSerializer(many=True, read_only=True)
    testemunhos = TestemunhoSerializer(many=True, read_only=True)
    carreiras = CarreiraSerializer(many=True, read_only=True)
    class Meta:
        model = Curso
        fields = '__all__'



class CandidaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidatura
        fields = '__all__'




