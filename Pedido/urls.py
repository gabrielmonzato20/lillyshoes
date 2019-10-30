from django.urls import path

from .views import ViewPedido

urlpatterns = [
    path('store', ViewPedido.store, name='store_pedido'),
    path('index', ViewPedido.index, name='index_pedido'),
    path('edit/<id>', ViewPedido.update, name='edit_pedido'),
    path('destroy/<id>', ViewPedido.destroy, name='destroy_pedido'),
    path('show/<id>', ViewPedido.show, name='show_pedido'),
    path('', ViewPedido.view, name='view_pedido'),

]
