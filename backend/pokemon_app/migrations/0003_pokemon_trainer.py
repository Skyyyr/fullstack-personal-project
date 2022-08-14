# Generated by Django 4.1 on 2022-08-06 17:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon_app', '0002_appuser_clicks'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pokemon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Trainer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trainer_name', models.CharField(max_length=20)),
                ('trainer_gender', models.CharField(max_length=1)),
                ('badge_count', models.IntegerField(default=0)),
                ('account_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('pokemon_slot_1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pokemon_app.pokemon')),
            ],
        ),
    ]