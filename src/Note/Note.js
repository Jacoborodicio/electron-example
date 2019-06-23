import React from 'react';
import {Link} from 'react-router-dom';
import { Header } from '../components/Header/Header';
class Note extends React.Component {
    render(){
        return(
            <div className='App'>
            <Header />
            <h1>Ventana para la creación de una nota</h1>
            <Link className='link' to='/'>Volver</Link>
            </div>
        );
    }
}

export default Note;