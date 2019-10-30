from django.db import models
from django.contrib.auth.models import User,Permission
from Cliente.models import Cliente
from Produto.models import Produto
# Create your models here.
class Pedido(models.Model):
    atendente = models.ForeignKey(User,on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente,on_delete=models.CASCADE)
    produtos = models.ManyToManyField(Produto,through='Produto_Pedido')

class Produto_Pedido(models.Model):
    produto = models.ForeignKey(Produto,on_delete=models.CASCADE)
    pedido = models.ForeignKey(Pedido,on_delete=models.CASCADE)
    preco_venda = models.FloatField(default=0)
    qtd = models.IntegerField()
