import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Game from "./components/home.component"
import Board from "./components/game-board.component"
import NavigationBar from "./components/Navbar/NavigationBar";


//Use router here
function App() {
  return (
      
    <div className="App">
      <header className="App-header">
        <NavigationBar />
        <Router>
          <Switch>
            <Route path='/' exact component={Game} />
            <Route path='/game' component={Board} />
          </Switch>
        </Router>

      </header>
    </div>
  );
}

export default App;
