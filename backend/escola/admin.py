from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Aeronave, ImagemAeronave

# Register your models here.

# Isto permite gerir a galeria dentro da página do Avião
class ImagemAeronaveInline(admin.TabularInline):
    model = ImagemAeronave
    extra = 1  

# Aplicamos o Summernote à História e injetamos o Inline das fotos
class AeronaveAdmin(SummernoteModelAdmin):
    summernote_fields = ('historia',)
    inlines = [ImagemAeronaveInline]
    list_display = ('nome', 'capacidade', 'ativo')

admin.site.register(Aeronave, AeronaveAdmin)