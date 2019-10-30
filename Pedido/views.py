from django.shortcuts import render
from django.http import HttpResponse,JsonResponse,HttpResponseNotFound
from .models import Pedido,Produto_Pedido
from Cliente.models import Cliente
from Produto.models import Produto
from Atendente.views import ViewFuncionario
from django.contrib.auth.models import User
from Cliente.models import Cliente
from Produto.models import Produto
from django.forms.models import model_to_dict
import requests
from django.core import serializers
from django.contrib.auth.decorators import login_required

class ViewPedido():
    @login_required(login_url='login')
    def view(request):
            dados_bruto = serializers.serialize('python', User.objects.all())
            funcionarios = []
            for dado in dados_bruto:
                funcionario =   dado['fields']
                funcionario['id'] = dado['pk']
                funcionarios.append(funcionario.copy())
                funcionario.clear()
            dados_bruto = serializers.serialize('python', Cliente.objects.all())
            clientes = []
            for dado in dados_bruto:
                cliente =   dado['fields']
                cliente['id'] = dado['pk']
                clientes.append(cliente.copy())
                cliente.clear()
            dados_bruto = serializers.serialize('python', Produto.objects.all())
            produtos = []
            for dado in dados_bruto:
                produto =   dado['fields']
                produto['id'] = dado['pk']
                produtos.append(produto.copy())
                produto.clear()
            return render(request,"pedido/pedido.html",{"user":request.user,'atendentes':funcionarios,"clientes":clientes,'produtos':produtos})
    def exemplo(request):
        print()
        print(request.POST['atendente'])
        dados = dict(request.POST);
        del dados['cliente']
        del dados['atendente']
        cont = 0
        print()
        dados = list(dados.values())
        for c in range(0,len(dados),3):
            print(c)

    def store(request):
        if request.method == 'POST':
            dados =  request.POST
            cliente = request.POST['cliente']
            atendente = request.POST['atendente']
            produtos = dict(request.POST)
            del produtos['cliente']
            del produtos['atendente']
            produtos = list(produtos.values())
            Atendente_model = User.objects.get(pk=atendente)
            Cliente_model = Cliente.objects.get(pk=cliente)
            pedido = Pedido(atendente = Atendente_model,cliente = Cliente_model)
            pedido.save()
            for c in range(0,len(produtos),3):
                produtos_model=Produto.objects.get(pk = produtos[c][0])
                produtos_pedido = Produto_Pedido.objects.create(produto=produtos_model, pedido =pedido,qtd =produtos[c+1][0],preco_venda =produtos[c+2][0])
            return JsonResponse({'menssagem':'Pedido Cadastrado com sucesso'},content_type="application/json",status=200)




    def index(request):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', Pedido.objects.all())
            pedidos = []
            for dado in dados_bruto:
                pedido =   dado['fields']
                pedido_model = Pedido.objects.get(pk =dado['pk'] )
                pedido['id'] = dado['pk']
                pedido['cliente'] = str(pedido_model.cliente.nome)
                pedido['atendente'] = str(pedido_model.atendente)
                dados_produto = serializers.serialize('python',pedido_model.produtos.all())
                produtos = []
                for produto in dados_produto:
                    produto_dic =   produto['fields']
                    produto_dic['id'] = produto['pk']
                    protudo_model = Produto.objects.get(pk = produto['pk'])
                    relacionamento= Produto_Pedido.objects.filter(pedido = pedido_model,produto = protudo_model).last()
                    produto_dic['qtd_venda'] = relacionamento.qtd
                    produto_dic['preco_venda'] = relacionamento.preco_venda
                    produtos.append(produto_dic.copy())
                    produto_dic.clear()
                pedido['produtos'] = produtos
                pedidos.append(pedido.copy())
                pedido.clear()

            return JsonResponse({'data':pedidos},content_type="application/json",status=200,safe=False)

    def destroy(request, id):
        if request.method == 'DELETE':
            pedido = Pedido.objects.filter(pk = id)
            if(pedido.count() > 0):
                pedido.delete()
                return JsonResponse({'menssagem':'Pedido Excluido com sucesso'},content_type="application/json",status=200)
            return HttpResponseNotFound('Erro interno')


    def update(request,id):
                if request.method == 'POST':
                    dados =  request.POST

                    cliente = request.POST['cliente_edit']
                    atendente = request.POST['atendente_edit']
                    produtos = dict(request.POST)
                    del produtos['cliente_edit']
                    del produtos['cliente_edit']
                    produtos = list(produtos.values())
                    Atendente_model = User.objects.get(pk=atendente)
                    Cliente_model = Cliente.objects.get(pk=cliente)
                    pedido = Pedido.objects.get(pk = id);
                    pedido.atendente = Atendente_model
                    pedido.cliente = Cliente_model
                    produtos_relation =  Produto_Pedido.objects.filter(pedido = pedido)
                    produtos_relation.delete()
                    for c in range(0,len(produtos),3):
                        produtos_model=Produto.objects.get(pk = produtos[c][0])
                        produtos_peido = Produto_Pedido.objects.create(produto=produtos_model, pedido =pedido,qtd =produtos[c+1][0])
                    return JsonResponse({'menssagem':'Pedido atualizado com sucesso'},content_type="application/json",status=200)

    def show(request,id):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', Pedido.objects.filter(pk= id))
            pedidos = []
            for dado in dados_bruto:
                pedido =   dado['fields']
                pedido_model = Pedido.objects.get(pk =dado['pk'] )
                pedido['id'] = dado['pk']
                pedido['cliente'] = str(pedido_model.cliente.nome)
                pedido['atendente'] = str(pedido_model.atendente)
                dados_produto = serializers.serialize('python',pedido_model.produtos.all())
                produtos = []
                for produto in dados_produto:
                    produto_dic =   produto['fields']
                    produto_dic['id'] = produto['pk']
                    protudo_model = Produto.objects.get(pk = produto['pk'])
                    relacionamento= Produto_Pedido.objects.filter(pedido = pedido_model,produto = protudo_model).last()
                    produto_dic['qtd_venda'] = relacionamento.qtd
                    produto_dic['preco_venda'] = relacionamento.preco_venda
                    produtos.append(produto_dic.copy())
                    produto_dic.clear()
                pedido['produtos'] = produtos
                pedidos.append(pedido.copy())
                pedido.clear()

            return JsonResponse({'data':pedidos},content_type="application/json",status=200,safe=False)

# Create your views here.
