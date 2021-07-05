from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GameSerializer, MoveSerializer
from .models import Game, Move

# Create your views here.
class GameView(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()

    def create(self, request, *args, **kwargs):
        response = super(GameView, self).create(request, *args, **kwargs)
        return response


class MoveView(viewsets.ModelViewSet):
    serializer_class = MoveSerializer
    queryset = Move.objects.all()