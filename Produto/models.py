from django.db import models

# Create your models here.
class Produto(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.CharField(max_length=100)
    preco = models.FloatField()
    cor = models.CharField(max_length=22)
    tamamho = models.FloatField()
    quantidade = models.IntegerField()
