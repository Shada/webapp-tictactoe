import './App.css';
import {Component} from "react";
import Board from "./components/game-board.component"
import GameDataService from "./services/game.service";

function GameStarted(props) {
  return (
    <div className="game">
      <div className="game-board">
        <Board gameID={props.gameID} />
      </div>
      <div className="game-info">
        <div>
          <p>GameID: {props.gameID}</p>
        </div>
      </div>
    </div>
  );
}

function GameMenu(props) {
  return (
    <div className="game">
      <div className="game-menu">
        <div>
          <p>Please click the button to start the game</p>
        </div>
      </div>
    </div>
  );
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: -1,
      gameStarted: false,
      currentGame: {}
    };
  }
  
  handleStartGameButtonClick() {
    // TODO: player names should be input via form
    var new_game =
    {
      player_one: "Player1",
      player_two: "Player2",
      moves: []
    }

    var self = this;
    GameDataService.create(new_game)
      .then(response => {
        self.setState({
          currentGame: response.data,
          gameID: response.data.id,
          gameStarted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleQuitGameButtonClick() {
    GameDataService.patch(this.state.currentGame.id, {completed: true})
      .then(response => {
        this.setState({
          gameStarted: false,
          gameID: -1,
          game: {}
        });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (this.state.gameStarted) {
      return (
        <div>
          <GameStarted gameID={this.state.currentGame.id}/>
          <button onClick={() => this.handleQuitGameButtonClick()}>
            Quit Game
          </button>
        </div>
      );
    }
    return (
      <div>
        <GameMenu/>
        <button onClick={() => this.handleStartGameButtonClick()}>
          New Game
        </button>
      </div>
    );
  }
}

function App() {
  return (
      
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
    </div>
  );
}

export default App;
