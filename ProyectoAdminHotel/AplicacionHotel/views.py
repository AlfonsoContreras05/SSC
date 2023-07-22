from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.hashers import check_password
from .models import Gerente
from .models import Habitacion, Pasajeros, Historial


#from .models import importes de los modelos

# Create your views here.

def LoginAdmin(request):
    if request.method == 'POST':
        username = request.POST.get('Administrador')
        password = request.POST.get('123456')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            if user.is_superuser:  # Verificar si el usuario es un superusuario
                login(request, user)
                return redirect('gerente')  # Redirecciona a la vista de ingreso de gerentes
            else:
                messages.error(request, 'No tienes permisos para acceder a esta página.')
                return redirect('loginadmin')
        else:
            messages.error(request, 'Credenciales inválidas. Inténtalo de nuevo.')
            return redirect('loginadmin')
    else:
        return render(request, 'Vistas/LoginAdmin.html')

def LoginGerente(request):
    #TomarDatos = #nombre modelo.objects.all()
    #Datoss1 = { "Datostabla" :TomarDatos }
    return render(request, "Vistas/LoginGerente.html")

def IngresoGerentes(request):
    if request.method == 'POST':
        rut = request.POST['rut']
        nombre = request.POST['nombre']
        telefono = request.POST['telefono']
        correo = request.POST['correo']
        contrasena = request.POST['contrasena']

        gerente = Gerente.objects.create(
            rut=rut,
            nombre_completo=nombre,
            telefono=telefono,
            email=correo,
            contraseña=contrasena
        )

        # Aquí puedes agregar cualquier lógica adicional o redireccionar a otra página si es necesario

        return redirect('gerente')

    else:
        gerentes = Gerente.objects.all()
        return render(request, 'Vistas/IngresoGerentes.html', {'gerentes': gerentes})
    


def AsignarHabitacion(request):
    if request.method == 'POST':
        nombre = request.POST['nombre']
        rut = request.POST['rut']
        habitacion_id = request.POST['habitaciones']

        habitacion = Habitacion.objects.get(id=habitacion_id)

        if habitacion.estado == 'Disponible':
            pasajero = Pasajeros(nombre=nombre, rut=rut, habitacion_id=habitacion_id, costos=habitacion.pasajeros_set.count() * 20000)

            pasajero.save()

            habitacion.estado = 'Asignada'
            habitacion.save()

            return redirect('ListadoPasajeros')

    habitaciones = Habitacion.objects.filter(estado='Disponible')
    return render(request, 'Vistas/IngresoPasajeros.html', {'habitaciones':habitaciones})




def IngresoHabitaciones(request):
    return render(request, "Vistas/IngresoHabitaciones.html")

def ListadoPasajeros(request):
    return render(request, "Vistas/ListadoPasajeros.html")


def EliminarGerente(request, gerente_id):
    if request.method == 'POST':
        try:
            gerente = Gerente.objects.get(id=gerente_id)
            gerente.delete()
            messages.success(request, 'El gerente ha sido eliminado exitosamente.')
        except Gerente.DoesNotExist:
            messages.error(request, 'El gerente no existe.')
        return redirect('gerente')
    else:
        return redirect('gerente')

def EditarGerente(request, gerente_id):
    try:
        gerente = Gerente.objects.get(id=gerente_id)
    except Gerente.DoesNotExist:
        messages.error(request, 'El gerente no existe.')
        return redirect('gerente')

    if request.method == 'POST':
        # Procesar los datos enviados en el formulario de edición
        rut = request.POST['rut']
        nombre = request.POST['nombre']
        telefono = request.POST['telefono']
        correo = request.POST['correo']
        contrasena = request.POST['contrasena']

        gerente.rut = rut
        gerente.nombre_completo = nombre
        gerente.telefono = telefono
        gerente.email = correo
        gerente.contraseña = contrasena

        gerente.save()
        messages.success(request, 'El gerente ha sido actualizado exitosamente.')
        return redirect('gerente')

    else:
        return render(request, 'Vistas/EditarGerente.html', {'gerente': gerente})

#funcion de ingreso de habitacion 
def IngresoHabitaciones(request):
    if request.method == 'POST':
        numero_habitacion = request.POST['numero_habitacion']
        cantidad_pasajeros = request.POST['cantidad_pasajeros']
        orientacion = request.POST['orientacion']

        habitacion = Habitacion(
            nro_habitacion=numero_habitacion,
            cant_pasajeros=cantidad_pasajeros,
            orientacion=orientacion,
            estado='Disponible'  # Asigna el estado inicial de la habitación
        )
        habitacion.save()

        return redirect('IngresoHabitaciones')

    else:
        habitaciones = Habitacion.objects.all()
        context = {'habitaciones': habitaciones}
        return render(request, 'Vistas/IngresoHabitaciones.html', context)

#Eliminar Habitacione
def EliminarHabitacion(request, habitacion_id):
    habitacion = Habitacion.objects.get(id=habitacion_id)
    habitacion.delete()

    messages.success(request, 'Habitación eliminada exitosamente.')

    return redirect('IngresoHabitaciones')

#Editar Habitaciones
def EditarHabitacion(request, habitacion_id):
    habitacion = Habitacion.objects.get(id=habitacion_id)

    if request.method == 'POST':
        # Obtener los datos actualizados del formulario
        numero_habitacion = request.POST['numero_habitacion']
        cantidad_pasajeros = request.POST['cantidad_pasajeros']
        orientacion = request.POST['orientacion']

        # Actualizar los campos de la habitación
        habitacion.nro_habitacion = numero_habitacion
        habitacion.cant_pasajeros = cantidad_pasajeros
        habitacion.orientacion = orientacion

        # Guardar los cambios en la base de datos
        habitacion.save()

        messages.success(request, 'Habitación actualizada exitosamente.')

        return redirect('IngresoHabitaciones')

    else:
        context = {'habitacion': habitacion}
        return render(request, 'Vistas/Editar_Habitacion.html', context)

#listar Habitaciones disponibles
def IngresoPasajeros(request):
    habitaciones = Habitacion.objects.all()
    context = {'habitaciones': habitaciones}
    return render(request, 'Vistas/IngresoPasajeros.html', context)

#historial def AsignarHabitacion(request):
    if request.method == 'POST':
        nombre = request.POST['nombre']
        rut = request.POST['rut']
        habitacion_id = request.POST['habitaciones']

        habitacion = Habitacion.objects.get(id=habitacion_id)

        if habitacion.estado == 'Disponible':
            pasajero = Pasajero(nombre=nombre, rut=rut, habitacion=habitacion)
            pasajero.save()

            historial = Historial(fecha=datetime.date.today(), costo=habitacion.pasajeros.count() * 20000, habitacion=habitacion, pasajero=pasajero)
            historial.save()

            habitacion.estado = 'Asignada'
            habitacion.save()

            return redirect('ListadoPasajeros')

    habitaciones = Habitacion.objects.filter(estado='Disponible')
    return render(request, 'Vistas/ListadoPasajeros.html', {'habitaciones': habitaciones})