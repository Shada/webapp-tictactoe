from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

# TODO: Do I have the moves stored one by one, making a huge table (up to 9 moves per game),
# or do I have one row per game, where the value is the list of moves, like a PGN in chess
# Start with one row per move
class Move(models.Model):

    game = models.ForeignKey("Game", on_delete=models.CASCADE)
    move_time = models.TimeField(auto_now=False, auto_now_add=True)
    square = models.IntegerField(validators=[MinValueValidator(0),
                                       MaxValueValidator(9)])

class Game(models.Model):
    """Model definition for Game."""

    # TODO: Players should be reference to users id
    start_time = models.TimeField(auto_now=False, auto_now_add=True)
    player_one = models.CharField(max_length=64)
    player_two = models.CharField(max_length=64)
    completed = models.BooleanField()
