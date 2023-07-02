from django.shortcuts import render
from django.http import HttpResponse,JsonResponse,HttpResponseNotFound
from django.contrib.auth.models import User
from django.core import serializers
from django.contrib.auth.decorators import login_required
from Pedido.models import Pedido
from django.db.models import Count
from django.core.serializers.json import DjangoJSONEncoder
import json
class DashView:
    @login_required(login_url='login')
    def view(request):
        return render(request,'dashboard/index.html')
    def pedidos(request):
        dados_bruto =  Pedido.objects.values('atendente').annotate(total = Count('atendente'))
        for dados in dados_bruto:
             atendente = User.objects.get(pk =dados['atendente'] )
             dados['atendente'] = atendente.username
        data = json.dumps(list(dados_bruto), cls=DjangoJSONEncoder)
        return JsonResponse(data,safe=False) 
    def pedidos_dia(request):
        dados_bruto =  Pedido.objects.values('created').annotate(total = Count('created'))
        data = json.dumps(list(dados_bruto), cls=DjangoJSONEncoder)
        return JsonResponse(data,safe=False) 