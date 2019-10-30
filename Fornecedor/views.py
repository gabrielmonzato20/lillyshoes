from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse,HttpResponseNotFound
from .models import Fornecedor
from django.forms.models import model_to_dict
import requests
from django.core import serializers
from django.contrib.auth.decorators import login_required

class ViewFornecedor():
    @login_required(login_url='login')
    def view(request):
        return render(request,"fornecedor/fornecedor.html",{"user":request.user})
    def store(request):
        if request.method == 'POST':
            dados =  request.POST
            fornecedor_nome = dados['nome_fornecedor'].title()
            fornecedor_cnpj = dados['cnpj_fornecedor']
            fornecedor_endereco = dados['endereco_fornecedor'].title()
            fornecedor_telefone = dados['telefone_fornecedor']
            fornecedor_email = dados['email_fornecedor']

            contador = Fornecedor.objects.filter(nome = fornecedor_nome, cnpj = fornecedor_cnpj).count()
            if(contador > 0):
                return HttpResponseNotFound('Fornecedor já cadastrado na base.')
            fornecedor = Fornecedor(
            nome = fornecedor_nome,
            cnpj = fornecedor_cnpj,
            endereco = fornecedor_endereco,
            telefone = fornecedor_telefone,
            email = fornecedor_email,
            )
            fornecedor.save()

            return JsonResponse({'menssagem':'Fornecedor cadastrado com sucesso'},content_type="application/json",status=200)

    def index(request):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', Fornecedor.objects.all())
            fornecedores = []
            for dado in dados_bruto:
                fornecedor = dado['fields']
                fornecedor['id'] = dado['pk']
                fornecedores.append(fornecedor.copy())
                fornecedor.clear()
            return JsonResponse({'data':fornecedores},content_type="application/json",status=200,safe=False)

    def destroy(request, id):
        if request.method == 'DELETE':
            fornecedor = Fornecedor.objects.filter(pk = id)
            if(fornecedor.count() > 0):
                fornecedor.delete()
                return JsonResponse({'menssagem':f'Fornecedor excluido com sucesso'},content_type="application/json",status=200)
            return HttpResponseNotFound('Ops! Não foi possível excluir o fornecedor')


    def update(request,id):
        if request.method == 'POST':
            dados =  request.POST
            print(dados)
            dados =  request.POST
            fornecedor_nome = dados['nome_forcecedor_edit']
            fornecedor_cnpj = dados['cnpj_fornecedor_edit']
            fornecedor_endereco = dados['endereco_fornecedor_edit']
            fornecedor_telefone = dados['telefone_fornecedor_edit']
            fornecedor_email = dados['email_fornecedor_edit']
            contador = Fornecedor.objects.filter(cnpj = fornecedor_cnpj).count()
            contador_fornecedor = Fornecedor.objects.filter(cnpj = fornecedor_cnpj,pk= id).count()
            if(contador > 0 and contador_fornecedor == 0):
                return HttpResponseNotFound('CNPJ já cadastrado.')
            fornecedor = Fornecedor.objects.get(pk = id)
            fornecedor.nome = fornecedor_nome
            fornecedor.cnpj = fornecedor_cnpj
            fornecedor.endereco = fornecedor_endereco
            fornecedor.telefone = fornecedor_telefone
            fornecedor.email = fornecedor_email
            fornecedor.save()
            return JsonResponse({'menssagem':'Atualização realizada com sucesso'},content_type="application/json",status=200)
        return HttpResponseNotFound('Ops! Não foi possível atualizar as informações do fornecedor')

    def show(request,id):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', Fornecedor.objects.filter(pk = id))
            fornecedores = []
            for dado in dados_bruto:
                fornecedor =   dado['fields']
                fornecedor['id'] = dado['pk']
                fornecedores.append(fornecedor.copy())
                fornecedor.clear()

            return JsonResponse({'data':fornecedores},content_type="application/json",status=200,safe=False)

