# Generated by Django 3.2.5 on 2021-07-05 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tictactoe', '0006_auto_20210705_1347'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='board_state',
            field=models.CharField(blank=True, max_length=9),
        ),
    ]