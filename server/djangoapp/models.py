
from django.db import models
from django.core.validators import MinValueValidator
from django.core.validators import MaxValueValidator


class CarMake(models.Model):
    '''
    A django model/ table with two fields: 
    1. Name of the car make
    2. Description of the car model
    '''
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self) -> str:
        return self.name


class CarModel(models.Model):
    '''
    A django model/ table with three fields: 
    1. Name of the car model
    2. Type of the car model
    3. Year of the car model
    car_make is a forign key that references CarModel to the CarMake
    '''
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    CAR_TYPES = [
        ('Sedan', 'Sedan'),
        ('SUV', 'SUV'),
        ('Wagon', 'Wagon')
    ]
    type = models.CharField(choices=CAR_TYPES, max_length=10, default='SUV')
    year = models.IntegerField(
        default=2023,
        validators=[
            MaxValueValidator(2023),
            MinValueValidator(2015)
        ]
    )

    def __str__(self) -> str:
        return self.name
