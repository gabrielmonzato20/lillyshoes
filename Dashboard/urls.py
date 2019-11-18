from .views import DashView
from django.urls import path
urlpatterns = [
    path('',DashView.view,name='dashborad'),
    path('total_pedidos',DashView.pedidos,name='dash'),
    path('total_pedidos_dia',DashView.pedidos_dia,name='dash'),
]
