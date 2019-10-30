from django.shortcuts import render
from django.http import HttpResponse,JsonResponse,HttpResponseNotFound
from .models import Produto

from django.forms.models import model_to_dict
import requests
from django.core import serializers
from django.contrib.auth.decorators import login_required

class ViewProduto():
    @login_required(login_url='login')
    def view(request):
        return render(request,"produto/produto.html",{"user":request.user})
    def store(request):
        if request.method == 'POST':
            dados =  request.POST
            produto_nome = dados['produto_nome'].title()
            produto_descricao = dados['produto_descricao'].capitalize()
            produto_tamanho = dados['produto_tamanho']
            produto_cor= dados['produto_cor']
            produto_preco= dados['produto_preco']
            produto_estoque = dados['produto_estoque']

            contador = Produto.objects.filter(nome = produto_nome , descricao = produto_descricao,tamamho=produto_tamanho,cor=produto_cor,preco=produto_preco).count()
            if(contador > 0):
                return HttpResponseNotFound('Produto já cadastrado na base.')
            produto = Produto(
            nome=produto_nome,
            descricao = produto_descricao,
            tamamho=produto_tamanho,
            cor=produto_cor,
            preco=produto_preco,
            quantidade = produto_estoque
            )
            produto.save()

            return JsonResponse({'menssagem':f'Produto {produto.nome} cadastrado com sucesso'},content_type="application/json",status=200)




    def index(request):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', Produto.objects.all())
            produtos = []
            for dado in dados_bruto:
                produto =   dado['fields']
                produto['id'] = dado['pk']
                produtos.append(produto.copy())
                produto.clear()

            return JsonResponse({'data':produtos},content_type="application/json",status=200,safe=False)

    def destroy(request, id):
        if request.method == 'DELETE':
            produto = Produto.objects.filter(pk = id)
            if(produto.count() > 0):
                produto.delete()
                return JsonResponse({'menssagem':'Produto excluido com sucesso'},content_type="application/json",status=200)
            return HttpResponseNotFound('Ops! Não foi possível excluir o produto')


    def update(request,id):
        if request.method == 'POST':
            dados =  request.POST
            if request.method == 'POST':
                dados =  request.POST
                produto_nome = dados['produto_nome_edit']
                produto_descricao = dados['produto_descricao_edit']
                produto_tamanho = dados['produto_tamanho_edit']
                produto_cor= dados['produto_cor_edit']
                produto_preco= dados['produto_preco_edit']
                produto_estoque = dados['produto_estoque_edit']
                contador = Produto.objects.filter(nome = produto_nome , descricao = produto_descricao,tamamho=produto_tamanho,cor=produto_cor,preco=produto_preco).count()
                produto = Produto.objects.get(pk = id)
                if(contador > 0 and produto.nome != produto_nome):
                    return HttpResponseNotFound('Produto já cadastrado na base.')
                produto = Produto.objects.get(pk = id)
                produto.nome=produto_nome
                produto.descricao=produto_descricao
                produto.tamamho=produto_tamanho
                produto.cor=produto_cor
                produto.preco=produto_preco
                produto.quantidade=produto_estoque
                produto.save()
                return JsonResponse({'menssagem':f'Atualização realizada com sucesso'},content_type="application/json",status=200)
        return HttpResponseNotFound('Ops! Não foi possível atualizar as informações do produto')

    def show(request,id):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', Produto.objects.filter(pk = id))
        
            produtos = []
            for dado in dados_bruto:
                produto =   dado['fields']
                produto['id'] = dado['pk']
                produtos.append(produto.copy())
                produto.clear()

            return JsonResponse({'data':produtos},content_type="application/json",status=200,safe=False)
