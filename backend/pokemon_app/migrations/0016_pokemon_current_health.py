# Generated by Django 4.1 on 2022-08-10 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon_app', '0015_alter_attacks_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='current_health',
            field=models.IntegerField(default=10),
        ),
    ]
