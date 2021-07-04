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
      game: {
        start_time: new Date(),
        player_one: "Player1",
        player_two: "Player2",
        board_state: ".........",
        completed: false,
        moves: [],
      }
    };
  }

  componentDidMount() {
    this.refreshGameData();
  }

  refreshGameData() {
    var self = this;
    axios
      .get('/api/games/3/')
      .then(function (response){
        console.log(response);
        self.setState({game: response.data});
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
      game: 3,
      square: i
    };
    
    axios
      .post('/api/moves/', move)
      .catch((err) => console.log(err));
    
    var localgame = this.state.game;
    console.log(squares);
    console.log(squares.toLocaleString());
    console.log(squares.join(""));
    localgame["board_state"] = squares.join("");
    axios
      .put('/api/games/3/', localgame)
      .then((res) => this.refreshGameData())
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
        <Board />
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
      gameID: 0,
      gameStarted: false
    };
  }
  
  handleStartGameButtonClick() {
    
    this.setState({
      gameStarted: true,
      gameID: this.state.gameID + 1
    });
  }
  
  handleQuitGameButtonClick() {
    let gameStarted = false;

    this.setState({
      gameStarted: gameStarted
    });
  }

  render() {
    if (this.state.gameStarted) {
      return (
        <div>
          <GameStarted gameID={this.state.gameID}/>
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
