from django.contrib.auth.models import AbstractUser
from django.db import models


# This is the actual account holder - not the individual 'trainer'
class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    # Email & Password are required by default.
    REQUIRED_FIELDS = []


# This is the account holders trainer 'account'
class Trainer(models.Model):
    # The associated account with this trainer
    account_id = models.OneToOneField(AppUser, on_delete=models.CASCADE)

    # Trainer details

    # Name cannot exceed 20 chars long
    trainer_name = models.CharField(max_length=20)

    # Gender assignment is 1 letter M or F
    trainer_gender = models.CharField(max_length=1)

    # Test assignment of each of the 6 slots for your active Pokemon
    # We use an int field that relates to the FK - we don't use an FK because this can be null
    # In the instance of the int field our 'null' is 0
    pokemon_slot_1 = models.IntegerField(default=0)
    pokemon_slot_2 = models.IntegerField(default=0)
    pokemon_slot_3 = models.IntegerField(default=0)
    pokemon_slot_4 = models.IntegerField(default=0)
    pokemon_slot_5 = models.IntegerField(default=0)
    pokemon_slot_6 = models.IntegerField(default=0)

    # Badge count determines how many badges they've earned
    badge_count = models.IntegerField(default=0)

    REQUIRED_FIELDS = [trainer_name, trainer_gender, account_id]

    def __str__(self):
        return f"{self.trainer_name}"


class Attacks(models.Model):
    name = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=60)

    base_damage = models.IntegerField(default=3)
    base_accuracy = models.IntegerField(default=3)

    color = models.CharField(max_length=20, default='default-color')

    def __str__(self):
        return f"{self.name}"


class Pokemon(models.Model):
    # Trainer that owns this pokemon (only caught pokemon are generated)
    trainer = models.ForeignKey(Trainer, on_delete=models.CASCADE, default=0)

    # Name / Nick name
    name = models.CharField(max_length=20, default='default')

    # Pokemon Id number from the pokedex
    pokedex_number = models.IntegerField(default=0)

    # Level
    level = models.IntegerField(default=3)
    exp = models.IntegerField(default=0)
    # reqExp = level * 10
    reqExp = models.IntegerField(default=30)

    # Stats
    health = models.IntegerField(default=10)
    speed = models.IntegerField(default=5)
    accuracy = models.IntegerField(default=5)
    defence = models.IntegerField(default=5)
    offence = models.IntegerField(default=5)

    # Health remaining should persist - if enough time to implement
    current_health = models.IntegerField(default=10)

    # Attacks by name
    attack_slot_1 = models.CharField(max_length=20, default='Tackle')
    attack_slot_2 = models.CharField(max_length=20, default='n')
    attack_slot_3 = models.CharField(max_length=20, default='n')
    attack_slot_4 = models.CharField(max_length=20, default='n')

    # Attack PP could be stored here per slot
    # attack_slot_1_pp = models.IntegerField(default=30)

    def __str__(self):
        return f"{self.name}"
