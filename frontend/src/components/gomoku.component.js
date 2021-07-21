import React from 'react';
import { Component } from 'react';

function DrawSquare(props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick}
      style={{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        justifyContent:'center',
        alignItems:'center',
        width:35,
        height:35,
        backgroundColor:'#EEE',
        color: '#333',
        fontSize: 24,
        verticalAlign: 'top',
      }}
    >
      {props.value}
    </button>
  );
}


class Gomoku extends Component {
  
  constructor(props) {
    super(props);

    let boardMatrix = [];

    for(var i = 0; i < 19; i++) {
      boardMatrix.push(new Array(19).fill(null));
    }

    this.state = {
      board: boardMatrix,
      xIsNext: true,
      status: null
    };
  }

  countElements(x, y, xDir, yDir) {
    let lookingFor = this.state.board[x][y];
    let count = 0;
    x = x + xDir;
    y = y + yDir;

    while (count < 6) {
      if(x < 0 || y < 0 || x >= this.state.board[0].length || y >= this.state.board.length) {
        break;
      }
      if (this.state.board[x][y] === lookingFor) {
        count++;
        x += xDir;
        y += yDir;
      }
      else {
        break;
      }
    }
    return count;
  }
  // check for 4-in-a-row around the most recent move
  calculateWin(i, j) { 

    //what piece we are looking for
    let lookingFor = this.state.board[i][j];

    // diagonal \
    if (1 + this.countElements(i,j,-1,-1) + this.countElements(i,j,1,1) === 5) {
      return lookingFor;
    }
    // diagonal /
    if (1 + this.countElements(i,j,1,-1) + this.countElements(i,j,-1,1) === 5) {
      return lookingFor;
    }
    // verical |
    if (1 + this.countElements(i,j,0,-1) + this.countElements(i,j,0,1) === 5) {
      return lookingFor;
    }
    // horizontal --
    if (1 + this.countElements(i,j,-1,0) + this.countElements(i,j,1,0) === 5) {
      return lookingFor;
    }

    let result = "stalemate"
    // if we find any null, we should continue, else we have stalemate
    this.state.board.forEach(row => 
      {
        if(row.indexOf(null) !== -1) {
          result = null
        }
      })

    return result;
  }

  handleClick(i, j) {
    if (this.state.status != null) {
      return;
    }
    var board = this.state.board.slice();

    if(board[i][j] != null) {
      return;
    }

    board[i][j] = this.state.xIsNext ? 'X' : 'O';

    let status = this.calculateWin(i, j);

    this.setState({
      board: board,
      xIsNext: !this.state.xIsNext,
      status: status
    });

  }

  renderSquare(i, j) {
    return <DrawSquare key={i*this.state.board[i].length+j}
      value={this.state.board[i][j]} 
      onClick={() => this.handleClick(i, j)}
    />;
  }

  renderRow(i) {
    var row = [];

    for (var j = 0; j < this.state.board[i].length; j++) {
      row.push(this.renderSquare(i, j));
    }

    return row;
  }

  renderBoard() {
    var squares = [];
    
    for (var i = 0; i < this.state.board.length; i++) {
      squares.push(<div key={i} className="row">{this.renderRow(i)}</div>);
    }

    return squares;
  }

  render() {
    
    return (
      <div style={{
          paddingTop: '65px',
      }}>
        {this.renderBoard()}

        <div style={{paddingTop: "25px"}}>
          {this.state.status !== null ? <p>Winner: {this.state.status}</p> : <p>Next : {this.state.xIsNext ? 'X' : 'O'}</p>}
        </div>
      </div>
    );
  }
}

export default Gomoku;
