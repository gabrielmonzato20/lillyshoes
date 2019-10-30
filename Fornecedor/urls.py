from django.urls import path

from .views import ViewFornecedor

urlpatterns = [
    path('store', ViewFornecedor.store, name='store_fornecedor'),
    path('index', ViewFornecedor.index, name='index_fornecedor'),
    path('edit/<id>', ViewFornecedor.update, name='edit_fornecedor'),
    path('destroy/<id>', ViewFornecedor.destroy, name='destroy_fornecedor'),
    path('show/<id>', ViewFornecedor.show, name='show_fornecedor'),
    path('', ViewFornecedor.view, name='view_fornecedor'),


]
