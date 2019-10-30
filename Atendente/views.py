from django.shortcuts import render,redirect
from django.contrib.auth.models import User,Permission
from django.http import HttpResponse,JsonResponse,HttpResponseNotFound
from django.core import serializers
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, get_user_model,login as auth,login,logout
from django.contrib.auth.models import User,Permission
from django.contrib.auth.decorators import login_required

class ViewFuncionario:
    @login_required(login_url='login')
    def view(request):
         return render(request,"atendente/atendente.html",{"user":request.user})
    def log(request):
        erro = False
        if request.method == 'POST':
            formulario = AuthenticationForm(request.POST)
            nome = request.POST['username']
            senha = request.POST['password']
            user = authenticate(username=nome, password=senha)
            if user is not None:
                login(request,user)
                request.session['admin_permissao'] = True if user.has_perm('change_user') else False
                return redirect('view_atendente')
            else:
                erro = True
                return render(request, 'login/login.html', {'form': formulario,'erro':erro})
        else:
            erro = False
            formulario = AuthenticationForm()
        return render(request, 'login/login.html', {'form': formulario,'erro':erro})
    def logout(request):
        logout(request)
        return redirect("login")
    def store(request):
        if request.method == 'POST':
            data = request.POST
            nome = data["nome_func"]
            senha = data['password']
            email = data['email_atendente']
            # ve se o usuario tem acesso a admin
            admin = 1 if 'admin' in request.POST else 0
        contador = User.objects.filter(username= nome , password = senha).count()
        if(contador > 0):
            return HttpResponseNotFound('Atendente já cadastrado.')
        if admin == 1:
            usuario = User.objects.create_superuser(username=nome, email=email, password=senha)
            permissao = Permission.objects.get(codename='change_user')
            usuario.user_permissions.add(permissao)
        else:
            usuario = User.objects.create_user(username=nome, email=email, password=senha)
        usuario.save()
        return JsonResponse({'menssagem':'Atendente cadastrado com sucesso'},content_type="application/json",status=200)

    def index(request):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', User.objects.all())
            funcionarios = []
            for dado in dados_bruto:
                funcionario =   dado['fields']
                funcionario['id'] = dado['pk']
                funcionarios.append(funcionario.copy())
                funcionario.clear()
            return JsonResponse({'data':funcionarios},content_type="application/json",status=200,safe=False)

    def destroy(request, id):
        if request.method == 'DELETE':
            funcionario = User.objects.filter(pk = id)
            if(funcionario.count() > 0):
                funcionario.delete()
                return JsonResponse({'menssagem':'Atendente excluido com sucesso'},content_type="application/json",status=200)
            return HttpResponseNotFound('Ops! Não foi possível excluir o atendente')

    def show(request,id):
        if request.method == 'GET':
            dados_bruto = serializers.serialize('python', User.objects.filter(pk = id))
            funcionarios = []
            for dado in dados_bruto:
                funcionario =   dado['fields']
                funcionario['id'] = dado['pk']
                funcionarios.append(funcionario.copy())
                funcionario.clear()
            return JsonResponse({'data':funcionarios},content_type="application/json",status=200,safe=False)

    def update(request,id):
        if request.method == 'POST':
            dados =  request.POST
            funcionario_username = dados['nome_func_edit']
            funcionario_email = dados['email_atendente_edit']
            senha = dados['password_edit']
            admin = 1 if 'admin_edit' in dados else 0
            contador = User.objects.filter(username = funcionario_username).count()
            funcionario = User.objects.get(pk = id)
            if(contador > 0 and funcionario_username != funcionario.username):
                return HttpResponseNotFound('Usuario  já cadastrado.')
            funcionario = User.objects.get(pk = id)
            funcionario.password=senha
            funcionario.username=funcionario_username
            funcionario.is_admin=admin
            funcionario.email = funcionario_email
            funcionario.save()
            return JsonResponse({'menssagem':f'Atualização realizada com sucesso'},content_type="application/json",status=200)
        return HttpResponseNotFound('Ops! Não foi possível atualizar as informações do atendente')
