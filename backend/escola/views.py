from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Aeronave, Curso, Recrutador, TemplateEmail
from .serializers import AeronaveSerializer, CursoSerializer, CandidaturaSerializer


# Create your views here.

class AeronaveListAPIView(generics.ListAPIView):
    # O filtro garante que o Next.js só recebe aviões que estejam marcados como "ativos"
    queryset = Aeronave.objects.filter(ativo=True)
    serializer_class = AeronaveSerializer

class AeronaveDetailAPIView(generics.RetrieveAPIView):
    queryset = Aeronave.objects.filter(ativo=True)
    serializer_class = AeronaveSerializer

class CursoListView(generics.ListAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


@api_view(['POST'])
def submeter_candidatura(request):
    serializer = CandidaturaSerializer(data=request.data)
    
    if serializer.is_valid():
        candidatura = serializer.save()
        recrutadores = list(Recrutador.objects.filter(ativo=True).values_list('email', flat=True))
        
        if recrutadores:
            # Garantir que temos texto para o curso e mensagem, mesmo que venham vazios
            nome_curso = candidatura.curso_interesse.titulo if candidatura.curso_interesse else "Não especificado"
            texto_mensagem = candidatura.mensagem if candidatura.mensagem else "Sem mensagem."

            # Tentar ir buscar o template à BD
            template = TemplateEmail.objects.first()
            
            if template:
                # Substituir as tags pelo conteúdo real (à prova de falhas)
                assunto = template.assunto.replace('{nome}', candidatura.nome).replace('{curso}', nome_curso)
                mensagem = template.corpo_mensagem.replace('{nome}', candidatura.nome)\
                                                  .replace('{email}', candidatura.email)\
                                                  .replace('{telefone}', candidatura.telefone)\
                                                  .replace('{curso}', nome_curso)\
                                                  .replace('{mensagem}', texto_mensagem)
            else:
                # Fallback de segurança caso a escola apague o template
                assunto = f"Nova Candidatura: {candidatura.nome}"
                mensagem = f"Candidato: {candidatura.nome}\nEmail: {candidatura.email}\nTelefone: {candidatura.telefone}\nCurso: {nome_curso}\nMensagem: {texto_mensagem}"
            
            send_mail(assunto, mensagem, settings.EMAIL_DEFAULT_FROM, recrutadores, fail_silently=False)
            
        return Response({"mensagem": "Sucesso!"}, status=status.HTTP_201_CREATED)
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)