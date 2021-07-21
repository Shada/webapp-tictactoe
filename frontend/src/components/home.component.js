
import {Component} from "react";
import GameDataService from "../services/game.service";
import {withRouter} from 'react-router-dom';

class Game extends Component {

  componentDidMount() {
  }
  
  handleStartGameButtonClick() {
    // TODO: player names should be input via form
    var new_game =
    {
      player_one: "Player1",
      player_two: "Player2",
      moves: []
    }
    let self = this;
    GameDataService.create(new_game)
      .then(response => {
        self.props.history.push({
            pathname: "/game",      
            props: { gameID: response.data.id }
          });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div style={{paddingTop: 100, height:"100%"}}>
        <p>Please click the button to start the game</p>
        <button className="btn btn-primary" onClick={() => this.handleStartGameButtonClick()}>
          New Game
        </button>
      </div>
    );
  }
}


export default withRouter(Game);
