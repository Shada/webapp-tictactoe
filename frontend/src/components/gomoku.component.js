import React from 'react';
import { Component } from 'react';

function Square(props) {
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
      xIsNext: true
    };
  }

  handleClick(i, j) {
    var board = this.state.board.slice();

    board[i][j] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      board: board,
      xIsNext: !this.state.xIsNext,
    });

  }

  renderSquare(i, j) {
    return <Square key={i*19+j}
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
      </div>
    );
  }
}

export default Gomoku;
