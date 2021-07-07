# Django + React TicTacToe

This is a small TicTacToe webapp. This is a hobby project, that is used for learning web development. 

Backend: Django
Frontend: React.js

Currently you can start a new game and play TicTacToe. 
The winner is presented on the screen. 

Future features:
The moves are all recorded to the database, and will be used for replaying the games.
Using an input form to input player names.
Move logic to the backend, like board state and check winner/stalemate

Future Future features:
Implement simple AI to play against
Register and login users, and play multiplayer

## How to use

1. Install the python environment by using `pipenv`
```
$ pipenv install
$ pipenv shell
```

2. Start the backend server
```
$ cd backend
$ python manage.py runserver
```

3. In a new terminal, Install the frontend prerequisites
```
$ cd frontend
$ npm install
```

4. Start the frontend server
```
$ npm start
```

The backend and fronend servers are now up and running, and you should be able to navigate to 
http://localhost:3000 in your web-browser and start playing TicTacToe.

