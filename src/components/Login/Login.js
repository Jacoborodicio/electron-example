import React from 'react';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }
    handleLogin = () => {
        console.log('Sending... ', this.state)
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
            </div>
        )
    }
}

export default Login;