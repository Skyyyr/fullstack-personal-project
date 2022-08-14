from django.contrib import admin
from .models import AppUser, Trainer, Pokemon, Attacks

# Register your models here.
admin.site.register((AppUser, Trainer, Pokemon, Attacks))
