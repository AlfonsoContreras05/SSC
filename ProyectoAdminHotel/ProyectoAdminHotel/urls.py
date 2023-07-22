"""ProyectoAdminHotel URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from AplicacionHotel import views

urlpatterns = [
    path('', views.LoginGerente, name='login_gerente'),
    path('loginadmin/', views.LoginAdmin, name='loginadmin'),
    path('gerente/', views.IngresoGerentes, name='gerente'),
    path('IngPasajeros/', views.IngresoPasajeros, name='IngresoPasajeros'),
    path('LiPasajeros/', views.ListadoPasajeros, name='ListadoPasajeros'),
    path('IngHabitaciones/', views.IngresoHabitaciones, name='IngresoHabitaciones'),
    path('gerente/eliminar/<int:gerente_id>/', views.EliminarGerente, name='eliminar_gerente'),
    path('gerente/editar/<int:gerente_id>/', views.EditarGerente, name='editar_gerente'),
    path('gerente/eliminar-habitacion/<int:habitacion_id>/', views.EliminarHabitacion, name='eliminar_habitacion'),
    path('gerente/editar-habitacion/<int:habitacion_id>/', views.EditarHabitacion, name='editar_habitacion'),
    path('asignar_habitacion/', views.AsignarHabitacion, name='AsignarHabitacion'),


]
