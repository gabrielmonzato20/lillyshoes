from django.urls import path

from .views import ViewCliente

urlpatterns = [
    path('store', ViewCliente.store, name='store_cliente'),
    path('index', ViewCliente.index, name='index_cliente'),
    path('edit/<id>', ViewCliente.update, name='edit_cliente'),
    path('destroy/<id>', ViewCliente.destroy, name='destroy_cliente'),
    path('show/<id>', ViewCliente.show, name='show_cliente'),
    path('', ViewCliente.view, name='view_cliente'),

]
