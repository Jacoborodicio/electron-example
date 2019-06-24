import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Note from './Note/Note';
import { Home } from './Home/Home';
import PopUp from './components/PopUp/PopUp';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className='App'>
      <div className="main-container">
      <Router>
        <Route path={"/createNote"} component={Note} />
        <Route path={"/popUp"} component={PopUp} />
        <Route path={"/login"} component={Login} />
        <Route exact path={"/"} component={Home} />
      </Router>
      </div>
      </div>
    );
  }
}

export default App;
