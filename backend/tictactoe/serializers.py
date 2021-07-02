from rest_framework import serializers
from .models import Game, Move

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'start_time', 'player_one', 'player_two', 'completed', 'moves')


class MoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Move
        fields = ('id', 'game', 'move_time', 'square')