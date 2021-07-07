import { Component } from "react";
import GameDataService from "../services/game.service";
import MoveDataService from "../services/move.service";


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

export default class Board extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill('.'), // TODO: This will be fetch from api.
      xIsNext: true,
      currentGame: {},
      gameID: props.gameID
    };
  }

  componentDidMount() {
    this.getGameData(this.state.gameID);
  }

  getGameData(id) {
    GameDataService.get(id)
      .then(response => {
        this.setState({
          currentGame: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleClick(i) {
    var squares = this.state.squares.slice();
    // No click if winner or square is taken
    if (calculateWinner(squares) || squares[i] !== '.') {
      return;
    }

    let move = {
      game: this.state.currentGame.id,
      square: i
    };

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

    MoveDataService.create(move)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

    GameDataService.patch(this.state.currentGame.id, {board_state: squares.join("")})
      .then(response => {
        this.setState({
          currentGame: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
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
