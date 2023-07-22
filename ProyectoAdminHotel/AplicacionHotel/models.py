from django.db import models

# Create your models here.

class Gerente(models.Model):
    rut = models.CharField(max_length=12, unique=True)
    nombre_completo = models.CharField(max_length=100)
    telefono = models.IntegerField()
    email = models.EmailField()
    contraseña = models.CharField(max_length=50)

#class Habitacion(models.Model):
 #   nro_habitacion = models.IntegerField(unique=True)
  #  cant_pasajeros = models.IntegerField()
   # orientacion = models.CharField(max_length=50)
    #estado = models.CharField(max_length=50)

#class Pasajeros(models.Model):
 #   nombre = models.CharField(max_length=100)
  #  rut = models.CharField(max_length=12, unique=True)
   # habitacion = models.ForeignKey('Habitacion', on_delete=models.PROTECT, related_name='pasajeros')
    #costos = models.IntegerField()

class Habitacion(models.Model):
    nro_habitacion = models.IntegerField()  # Actualiza el nombre de la columna
    cant_pasajeros = models.IntegerField()
    orientacion = models.CharField(max_length=100)
    estado = models.CharField(max_length=100, default='Disponible')

    def __str__(self):
        return str(self.nro_habitacion)

class Pasajeros(models.Model):
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=12)
    habitacion = models.ForeignKey(Habitacion, on_delete=models.CASCADE)
    costos = models.IntegerField()

    def __str__(self):
        return self.nombre

#class Historial(models.Model):
 #   nombre_pasajeros = models.ForeignKey('Pasajeros', on_delete=models.PROTECT)
  #  habitacion = models.ForeignKey('Habitacion', on_delete=models.PROTECT)
   # fecha = models.DateField()
    #costo = models.IntegerField()

class Admin(models.Model):
    usuario = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    
    
class Historial(models.Model):
    fecha = models.DateField()
    costo = models.IntegerField()
    habitacion = models.ForeignKey(Habitacion, on_delete=models.CASCADE)
    pasajero = models.ForeignKey(Pasajeros, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pasajero.nombre} - Habitación {self.habitacion.numero}"