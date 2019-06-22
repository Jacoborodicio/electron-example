import React from 'react';
import {Link} from 'react-router-dom';
class Note extends React.Component {
    render(){
        return(
            <React.Fragment>
            <h1>Ventana para la creación de una nota</h1>
            <Link to='/'>Volver</Link>
            </React.Fragment>
        );
    }
}

export default Note;