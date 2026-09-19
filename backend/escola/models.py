from django.db import models

# Create your models here.
class Aeronave(models.Model):
    #info card
    nome = models.CharField(max_length=100, help_text="Ex: Cessna 152")
    descricao_curta = models.CharField(max_length=150, help_text="Texto curto para aparecer no Card da frota")
    imagem_principal = models.ImageField(upload_to='frota/principais/', help_text="Foto que aparece no Card")

    # Info para a Página de Detalhe
    historia = models.TextField(help_text="História e descrição longa (permite formatação)")
    motor = models.CharField(max_length=150, help_text="Ex: Lycoming O-235-L2C")
    capacidade = models.IntegerField(help_text="Número de lugares")
    velocidade_cruzeiro = models.CharField(max_length=50, help_text="Ex: 107 nós")
    autonomia = models.CharField(max_length=50, help_text="Ex: 4.5 horas")
    
    ativo = models.BooleanField(default=True, help_text="Avião está ao serviço?")

    link_externo = models.URLField(
        max_length=500, 
        blank=True, 
        null=True, 
        help_text="Link para o site oficial do fabricante"
    )

    ordem = models.IntegerField(
        default=0, 
        help_text="Ordem de apresentação (ex: 1 para aparecer primeiro)"
    )

    class Meta:
        ordering = ["ordem"]
        verbose_name = "Aeronave"
        verbose_name_plural = "Frota"

    def __str__(self):
        return self.nome


class ImagemAeronave(models.Model):
    # A magia acontece aqui: o related_name='galeria' vai facilitar muito a construção da API para o Next.js
    aeronave = models.ForeignKey(Aeronave, related_name='galeria', on_delete=models.CASCADE)
    imagem = models.ImageField(upload_to='frota/galeria/')
    legenda = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = "Imagem da Galeria"
        verbose_name_plural = "Galeria de Imagens"


class Curso(models.Model):
    titulo = models.CharField(max_length=100, help_text="Ex: ATPL")
    slug = models.SlugField(max_length=120, unique=True, blank=True, null=True)
    imagem_destaque = models.ImageField(upload_to='cursos/', blank=True, null=True)

    horas_totais = models.CharField(max_length=50, help_text="Ex: 30 Hrs")
    descricao_curta = models.TextField(help_text="Resumo que aparece no topo da página de cursos")

    descricao_completa = models.TextField(blank=True, null=True, help_text="Texto detalhado da página do curso")
    saidas_profissionais = models.TextField(blank=True, null=True, help_text="O que o aluno pode fazer após o curso")

    ordem = models.IntegerField(default=0)

    class Meta:
        ordering = ['ordem']
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"

    def __str__(self):
        return self.titulo

class EtapaCurso(models.Model):
    curso = models.ForeignKey(Curso, related_name='etapas', on_delete=models.CASCADE)
    numero_etapa = models.IntegerField(help_text="1, 2, 3... para ordenar a timeline")
    titulo_etapa = models.CharField(max_length=150, help_text="Ex: Fase 1 - Ground School")
    descricao = models.TextField(help_text="O que o aluno vai fazer nesta fase")
    horas_associadas = models.CharField(max_length=50, blank=True, null=True, help_text="Ex: 920H Teoria")

    class Meta:
        ordering = ['numero_etapa']
        verbose_name = "Etapa do Curso"
        verbose_name_plural = "Etapas do Curso"

    def __str__(self):
        return f"{self.curso.titulo} - Etapa {self.numero_etapa}"