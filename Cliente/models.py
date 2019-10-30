from django.db import models

# Create your models here.
class Cliente(models.Model):
    nome = models.CharField(max_length=50)
    cpf = models.CharField(max_length=18)
    endereco = models.CharField(max_length=100)
    telefone = models.CharField(max_length=22)
    email = models.CharField(max_length=80, default='')
    cep = models.CharField(max_length=50)
    dt_nascimento = models.CharField(max_length=80)
    sexo = models.BooleanField(default=True)
