from django.shortcuts import render
from django.http import HttpResponse,JsonResponse,HttpResponseNotFound
from .models import Cliente
from django.forms.models import model_to_dict
import requests
from django.core import serializers
from django.contrib.auth.decorators import login_required

class ViewCliente():
    @login_required(login_url='login')
    def view(request):
        return render(request,"cliente/cliente.html",{"user":request.user})
    def store(request):
        if request.method == 'POST':
            dados =  request.POST
            cliente_nome = dados['cliente_nome'].title()
            cliente_email = dados['email_cliente']
            cliente_cpf = dados['cpf_cliente']
            cliente_endereco= dados['endereco_cliente'].title()
            cliente_telefone = dados['telefone_cliente']
            cliente_cep = dados['cliente_cep']
            cliente_nascimento = dados['nascimento_cliente']
            cliente_sexo = dados['sexo']

            contador = Cliente.objects.filter(nome = cliente_nome , cpf = cliente_cpf).count()
            if(contador > 0):
                return HttpResponseNotFound('Cliente já cadastrado na base.')

            cliente = Cliente(
            nome=cliente_nome,
            endereco = cliente_endereco,
            cpf=cliente_cpf,
            cep=cliente_cep,
            telefone=cliente_telefone,
            email=cliente_email,
            dt_nascimento=cliente_nascimento,
            sexo = cliente_sexo,
            )
            cliente.save()

            return JsonResponse({'menssagem':'Cliente cadastrado com sucesso'},content_type="application/json",status=200)

    def index(request):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', Cliente.objects.all())
            clientes = []
            for dado in dados_bruto:
                cliente = dado['fields']
                cliente['id'] = dado['pk']
                clientes.append(cliente.copy())
                cliente.clear()
            return JsonResponse({'data':clientes},content_type="application/json",status=200,safe=False)

    def destroy(request, id):
        if request.method == 'DELETE':
            cliente = Cliente.objects.filter(pk = id)
            if(cliente.count() > 0):
                cliente.delete()
                return JsonResponse({'menssagem':'Cliente excluido com sucesso'},content_type="application/json",status=200)
            return HttpResponseNotFound('Ops! Não foi possível excluir o cliente')


    def update(request,id):
        if request.method == 'POST':
            dados = request.POST
            print(dados)
            dados = request.POST
            cliente_nome = dados['cliente_nome_edit']
            cliente_email = dados['email_cliente_edit']
            cliente_cpf = dados['cpf_cliente_edit']
            cliente_endereco= dados['endereco_cliente_edit']
            cliente_telefone = dados['telefone_cliente_edit']
            cliente_cep = dados['cliente_cep_edit']
            cliente_sexo = dados['sexo_edit']
            cliente_nascimento = dados['data_cliente_edit']
            contador = Cliente.objects.filter(cpf = cliente_cpf).count()
            contador_cliente = Cliente.objects.filter(cpf = cliente_cpf,pk= id).count()
            if(contador > 0 and contador_cliente == 0):
                return HttpResponseNotFound('Cpf já cadastrado.')
            cliente = Cliente.objects.get(pk = id)
            cliente.endereco=cliente_endereco
            cliente.cpf=cliente_cpf
            cliente.cep=cliente_cep
            cliente.telefone=cliente_telefone
            cliente.nome=cliente_nome
            cliente.sexo=cliente_sexo
            cliente.dt_nascimento=cliente_nascimento
            cliente.save()
            return JsonResponse({'menssagem':f'Atualização realizada com sucesso'},content_type="application/json",status=200)
        return HttpResponseNotFound('Ops! Não foi possível atualizar as informações do cliente')

    def show(request,id):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', Cliente.objects.filter(pk = id))
            clientes = []
            for dado in dados_bruto:
                cliente = dado['fields']
                cliente['id'] = dado['pk']
                clientes.append(cliente.copy())
                cliente.clear()

            return JsonResponse({'data':clientes},content_type="application/json",status=200,safe=False)
