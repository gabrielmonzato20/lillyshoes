from django.urls import path

from .views import ViewFuncionario

urlpatterns = [
    path('store', ViewFuncionario.store, name='store_cliente'),
    path('index', ViewFuncionario.index, name='index_cliente'),
    path('edit/<id>', ViewFuncionario.update, name='edit_cliente'),
    path('destroy/<id>', ViewFuncionario.destroy, name='destroy_cliente'),
    path('show/<id>', ViewFuncionario.show, name='show_cliente'),
    path('view', ViewFuncionario.view, name='view_atendente'),
    path('', ViewFuncionario.log, name='login'),
    path('/logout', ViewFuncionario.logout, name='logout'),

]
