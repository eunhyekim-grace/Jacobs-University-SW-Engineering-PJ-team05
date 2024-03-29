# Generated by Django 3.0.5 on 2021-03-08 23:15

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('beer', '0006_auto_20210308_2308'),
    ]

    operations = [
        migrations.AddField(
            model_name='instructor',
            name='players',
            field=models.ManyToManyField(related_name='instructors_players', to='beer.Player'),
        ),
        migrations.CreateModel(
            name='DemandPattern',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='public_id')),
                ('name', models.CharField(max_length=64)),
                ('weeks', models.IntegerField(validators=[django.core.validators.MaxValueValidator(52), django.core.validators.MinValueValidator(8)])),
                ('demand', models.CharField(blank=True, max_length=256)),
                ('related_games', models.CharField(blank=True, max_length=1024)),
                ('instructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instructors_demand_pattern', to='beer.Instructor')),
            ],
            options={
                'verbose_name': 'demand_pattern',
                'verbose_name_plural': 'demand_patterns',
            },
        ),
    ]
