import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Game from "./components/home.component"
import Board from "./components/game-board.component"
import Gomoku from "./components/gomoku.component"
import NavigationBar from "./components/Navbar/NavigationBar";


//Use router here
function App() {
  return (
      
    <div className="App">
      <NavigationBar />
      <div className="App-header">
        <Router>
          <Switch>
            <Route path='/' exact component={Game} />
            <Route path='/game' component={Board} />
            <Route path='/gomoku' component={Gomoku} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
