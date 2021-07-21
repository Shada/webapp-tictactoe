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

    this.state = {
      squares: Array(361).fill(null), // TODO: This will be fetch from api.
      xIsNext: true
    };
  }

  handleClick(i) {
    var squares = this.state.squares.slice();

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

  renderRows(row) {
    var rows = [];
      for (var j = 0; j < 19; j++) {
        rows.push(this.renderSquare(j+row*19));
      }
    return rows;
  }
  renderBoard() {
    var squares = [];
    for (var i = 0; i < 19; i++) {
      squares.push(<div className="row" style={{flex:0, alignItems: 'center'}}>{this.renderRows(i)}</div>);
    }
    return squares;
  }

  render() {
    
    return (
      <>
      <div style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '65px',
          flex: 1,
          flexDirection: 'row',
      }}>
        {this.renderBoard()}
      </div>
      </>
    );
  }
}

export default Gomoku;
