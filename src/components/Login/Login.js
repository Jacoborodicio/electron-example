import React from 'react';
import {Button} from '@material-ui/core';
import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const forecastsURL = 'https://localhost:8443/claimreport/home/api/forecasts';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }
    

    handleLogin = () => {
        ipcRenderer.send('getLogin', {username: this.state.username, password: this.state.password});
        console.log('si se ejecuta el código después')
    }
    tryAccess  = () => {
        ipcRenderer.send('close-login');
    }
    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log('state on login: ', this.state));
    }
    render(){
        return(
            <div className='login'>
                <p>Username: </p>
                <input type='text' name='username' value={this.state.username} onChange={(e) => this.handleOnChange(e)} />
                <p>Password: </p>
                <input type='password' name='password' value={this.state.password} onChange={(e) => this.handleOnChange(e)} />
                <hr/>
                <Button onClick={this.handleLogin}>Login</Button>
                <hr/>
                <Button onClick={this.tryAccess}>Close Window</Button>
            </div>
        )
    }
}

export default Login;