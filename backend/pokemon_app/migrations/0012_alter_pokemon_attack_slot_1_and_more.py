# Generated by Django 4.1 on 2022-08-09 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon_app', '0011_trainer_pokemon_slot_2_trainer_pokemon_slot_3_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='attack_slot_1',
            field=models.CharField(default='Tackle', max_length=20),
        ),
        migrations.AlterField(
            model_name='pokemon',
            name='attack_slot_2',
            field=models.CharField(default='n', max_length=20),
        ),
        migrations.AlterField(
            model_name='pokemon',
            name='attack_slot_3',
            field=models.CharField(default='n', max_length=20),
        ),
        migrations.AlterField(
            model_name='pokemon',
            name='attack_slot_4',
            field=models.CharField(default='n', max_length=20),
        ),
    ]
