import './App.css';
import {Component} from "react";
import axios from "axios";

// TODO: This should be done in the backend when connected 
function calculateWinner(squares) {
  const winning_rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winning_rows.length; i++) {
    const [a, b, c] = winning_rows[i];
    if (squares[a] !== '.' && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null;
}

function Square(props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick}
      style={{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:100,
        height:100,
        backgroundColor:'#EEE',
        flex: 1,
        color: props.value === '.' ? '#EEE' : '#333' ,
        fontSize: 70,
      }}
    >
      {props.value}
    </button>
  );
}

class Board extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill('.'), // TODO: This will be fetch from api.
      xIsNext: true,
      game_data: {},
      gameID: props.gameID
    };
  }

  componentDidMount() {
    this.refreshGameData();
  }

  refreshGameData() {
    var self = this;
    axios
      .get('/api/games/' + self.state.gameID + '/')
      .then(function (response){
        console.log(response);
        self.setState({game_data: response.data});
      })
      .catch(function(err) {
        console.log(err)
      });
  };

  handleClick(i) {
    var squares = this.state.squares.slice();
    // No click if winner or square is taken
    if (calculateWinner(squares) || squares[i] !== '.') {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    let move = {
      game: this.state.game_data.id,
      square: i
    };
    
    axios
      .post('/api/moves/', move)
      .catch((err) => console.log(err));
    
    var self = this;
    axios
      .patch('/api/games/' + self.state.game_data.id + '/', {board_state: squares.join("")})
      .then((res) => self.refreshGameData())
      .catch((err) => console.log(err.response));
  }

  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

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
      game_data: {}
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
    axios
      .post("/api/games/", new_game)
      .then(function (response) {
        self.setState({game_data: response.data});
        self.setState({gameID: response.data.id});
        self.setState({gameStarted: true});
      })
      .catch((err) => console.log(err.response));
  }

  handleQuitGameButtonClick() {
    let self = this;

    axios
      .patch('/api/games/' + self.state.game_data.id +'/', {completed: true})
      .then(self.setState({
        gameStarted: false,
        gameID: -1,
        game: {}
      }))
      .catch((err) => console.log(err.response));
  }

  render() {
    if (this.state.gameStarted) {
      return (
        <div>
          <GameStarted game_data={this.state.game_data} gameID={this.state.game_data.id}/>
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
