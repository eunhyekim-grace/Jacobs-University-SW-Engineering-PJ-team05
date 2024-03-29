# Generated by Django 3.0.5 on 2021-03-08 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beer', '0004_auto_20210308_2257'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='allowed_games',
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AddField(
            model_name='player',
            name='backorder',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='player',
            name='current_game',
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AddField(
            model_name='player',
            name='downstream_player',
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AddField(
            model_name='player',
            name='instructors',
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AddField(
            model_name='player',
            name='inventory',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='player',
            name='upstream_player',
            field=models.CharField(blank=True, max_length=64),
        ),
    ]
