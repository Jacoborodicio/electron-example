import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Note from './Note/Note';
import { Home } from './Home/Home';


const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 style={{display: 'inline', marginLeft: 25}}>Small notes app created using electron & react</h2>
        </div>
      </div>
      <div className="main-container">
      <Router>
        <Route path={"/createNote"} component={Note} />
        <Route exact path={"/"} component={Home} />
      </Router>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
