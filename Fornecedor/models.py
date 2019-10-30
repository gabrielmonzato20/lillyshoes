from django.db import models
from Produto.models import Produto
# Create your models here.
class Fornecedor(models.Model):
    nome = models.CharField(max_length=50)
    cnpj = models.CharField(max_length=18)
    endereco = models.CharField(max_length=100)
    telefone = models.CharField(max_length=22)
    email = models.CharField(max_length=80)
    produtos = models.ManyToManyField(Produto)


