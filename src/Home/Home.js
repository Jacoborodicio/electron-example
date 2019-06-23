import React from 'react';
import {Link} from 'react-router-dom';
import { Header } from '../components/Header/Header';
import {Button} from '@material-ui/core';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const Home = props => {
    const showPopUp = () => {
        const defaultTextToTest = 'Este testo nace en home y se envía con la acción de toggle-popup';
        ipcRenderer.send('toggle-popup', defaultTextToTest);
    }

    const showNotification = () => {
        ipcRenderer.send('notification', {title: 'Demo Notification', body: 'Sended from home.js'})
    };
    

    return (

        <div className='App'>
        <Header />
        <h1>Este es el home de la aplicación</h1>
        <Link className='link' to='/createNote'>Create a note</Link>
        {/* <Link className='link' to='/popUp'>Open a popUp</Link> */}
        
        <Button
            onClick={() => showPopUp()}
        >Show popUp</Button>

        <Button
            onClick={() => showNotification()}
        >Show notification</Button>
        </div>
    )
}