import React from 'react';
import logo from '../../assets/logo.svg';

export const Header = props => {
    return (
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 style={{display: 'inline', marginLeft: 25}}>Example of React & Electron working together</h2>
        </div>
    )
}