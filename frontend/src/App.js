import './App.css';
import React from "react";

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
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
        color: props.value ? '#333' :'#EEE',
        fontSize: 70,
      }}
    >
      {props.value ? props.value : '.'}
    </button>
  );
}

class Board extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // TODO: This will be fetch from api.
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    // No click if winner or square is taken
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
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

function WhichToRender(props) {
  if (props.gameStarted) {
    return <GameStarted gameID={props.gameID}/>;
  }
  return <GameMenu/>;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: 0,
      gameStarted: false
    };
  }
  
  handleStartGameButtonClick() {
    let gameStarted = !this.state.gameStarted;
    let gameID = this.state.gameID;
    
    gameID += gameStarted ? 1 : 0;

    this.setState({
      gameStarted: gameStarted,
      gameID: gameID
    });
  }

  render() {
    return (
      <div>
        <WhichToRender gameStarted={this.state.gameStarted} gameID={this.state.gameID}/>
        <button onClick={() => this.handleStartGameButtonClick()}>
          New Game
        </button>
      </div>
    )  
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
