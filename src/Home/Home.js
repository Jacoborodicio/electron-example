import React from 'react';
import {Link} from 'react-router-dom';
import { Header } from '../components/Header/Header';
import {Button} from '@material-ui/core';
import axios from 'axios';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


const forecastsURL = 'https://localhost:8443/claimreport/home/api/forecasts';

export const Home = props => {
    const showPopUp = () => {
        const defaultTextToTest = 'This text is born in home and is sent with the action of toggle-popup';
        ipcRenderer.send('toggle-popup', defaultTextToTest);
    }

    const showNotification = () => {
        ipcRenderer.send('notification', {title: 'Demo Notification', body: 'Sended from home.js'})
    };
    
    const goToLoginWithPopUp = () =>  {
        ipcRenderer.send('login-component');
    }
    const make401error = () => {
        axios.get(forecastsURL)
            .then(response => console.log('response: ', response))
            .catch(err => console.log('err: ', err));
    }

    return (

        <div className='App'>
        <Header />
        <h3>Available demo actions:</h3>
        <Link className='link' to='/createNote'>Create a note</Link>
        {/* <Link className='link' to='/popUp'>Open a popUp</Link> */}
        <div className='item'>
        <Button
            onClick={() => showPopUp()}
        >Show popUp</Button>
        </div>
        <div className='item'>
        <Button
            onClick={() => showNotification()}
        >Show notification</Button>
        </div>
        <div className='item'>
        <Button
            onClick={() => goToLoginWithPopUp()}
        >Go to demo login</Button>
        </div>
        <div className='item'>
        <Button
            onClick={() => make401error()}
        >Try incertecptors for 401</Button>
        </div>
        </div>
    )
}