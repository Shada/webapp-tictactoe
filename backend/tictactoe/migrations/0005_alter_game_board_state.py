# Generated by Django 3.2.5 on 2021-07-03 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tictactoe', '0004_game_board_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='board_state',
            field=models.CharField(max_length=9),
        ),
    ]