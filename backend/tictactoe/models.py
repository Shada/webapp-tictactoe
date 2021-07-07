from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

# TODO: When a move is added, update the board state
# Then check winning status in backend
# keep track of current player here or in fronend? 
class Move(models.Model):

    game = models.ForeignKey("Game", related_name='moves', on_delete=models.CASCADE)
    move_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    square = models.IntegerField(validators=[MinValueValidator(0),
                                       MaxValueValidator(8)])

    class Meta:
        unique_together = ['game', 'square']
        ordering = ['move_time']

    def __str__(self):
        return '{0}'.format(self.square)


class Game(models.Model):
    """Model definition for Game."""

    # TODO: Players should be reference to users id
    start_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    player_one = models.CharField(max_length=64)
    player_two = models.CharField(max_length=64)
    board_state = models.CharField(max_length=9, default=".........")
    completed = models.BooleanField(default=False)

    def __str__(self):
        return '{0}: {1} vs {2}'.format(self.pk, self.player_one, self.player_two)

    def get_absolute_url(self):
        return reverse('game:detail', kwargs={'pk': self.pk})

    @property
    def next_player(self):
        return player_one if (self.moves.count() % 2 == 0) else player_two

    @property
    def is_game_over(self):
        return False

    @property
    def check_winner(self):
        return None
        
