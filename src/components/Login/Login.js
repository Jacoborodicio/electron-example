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

        // const encodedString = new Buffer(
        //     this.state.userName + ':' + this.state.password
        //   ).toString('base64');
        //   const authorizationData = 'Basic ' + encodedString;
        //   console.log('Encoded Authorization Data : ', authorizationData);
        // console.log('Sending... ', this.state)
        // axios
        // .get(forecastsURL, {
        //     withCredentials: true,
        //     headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: authorizationData
        //     },
        //     credentials: 'cross-origin'
        // })
        // .then(res => {
        //     console.log('response with login: ',res);
        //     console.log('Headers : ', res.headers);
        // })
        // .catch(error => {
        //     console.log('error ' + error);
        // });



    }
    tryAccess  = () => {
        // axios
        // .get(forecastsURL, {
        //     withCredentials: true,
        //     headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: ''
        //     },
        //     credentials: 'cross-origin'
        // })
        // .then(res => {
        //     console.log('res: ', res);
        // })
        // .catch(error => {
        //     console.log('error ' + error);
        // });
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
                <Button onClick={this.tryAccess}>Try access</Button>
            </div>
        )
    }
}

export default Login;