import React from 'react';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class PopUp extends React.Component {
    state = {
        paramsFromElectron: ''
    }
    componentDidMount() {
        ipcRenderer.on('send-text', (event, arg) => {
            this.setState({
                paramsFromElectron: arg
            })
        })
    }
    render() {
        return (
            <div className='popUp'>
            <h4>PopUp</h4>
            <p>Mensaje recibido mediante ipc:</p>
            <p>{this.state.paramsFromElectron}</p>
            </div>
        );
    }
}

export default PopUp;