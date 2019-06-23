import React from 'react';
import {Link} from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Button } from '@material-ui/core';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Note extends React.Component {
    state = {
        text: '',
        restoredText: ''
    }

    componentDidMount() {
        ipcRenderer.on('handle-fetch-note-storage', this.handleFetchNote);
        ipcRenderer.on('handle-save-note-storage', this.handleSaveNote);
    }
    componentWillUnmount()  {
        ipcRenderer.removeListener('handle-fetch-note-storage', this.handleFetchNote);
        ipcRenderer.removeListener('handle-save-note-storage', this.handleSaveNote);
    }
    handleFetchNote = (event, data) => {
        console.log('on handleFetchNote, with data: ', data)
        const { text } = data;
        this.setState({
            restoredText : text
        })
    }

    handleSaveNote = (event, data) => {
        console.log('handleSaveNote...')
        this.setState({text:''});
        this.loadSavedNote();
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    loadSavedNote = () => {
        console.log('loadSavedNote');
        ipcRenderer.send('fetch-note-from-storage');
    }
    saveNote = () => {
        console.log('saveNote');
        ipcRenderer.send('save-note-to-storage', this.state.text);
        this.setState({text:''});

    }
    render(){
        return(
            <div className='App'>
            <Header />
            <div>
                <Button onClick={() => this.loadSavedNote()}>
                    Load saved note
                </Button>
                <p>{this.state.restoredText}</p>
            </div>
            <div>
                <input type='text' name='text' value={this.state.text} onChange={this.handleOnChange}/>
                <Button onClick={() => this.saveNote()}>
                    Save note
                </Button>
            </div>
            <Link className='link' to='/'>Volver</Link>
            </div>
        );
    }
}

export default Note;