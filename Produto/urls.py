from django.urls import path

from .views import ViewProduto

urlpatterns = [
    path('store', ViewProduto.store, name='store_produto'),
    path('index', ViewProduto.index, name='index_produto'),
    path('edit/<id>', ViewProduto.update, name='edit_produto'),
    path('destroy/<id>', ViewProduto.destroy, name='destroy_produto'),
    path('show/<id>', ViewProduto.show, name='show_produto'),
    path('', ViewProduto.view, name='view_produto'),
]
