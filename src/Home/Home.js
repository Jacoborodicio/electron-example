import React from 'react';
import {Link} from 'react-router-dom';

export const Home = props => {
    return (
        <React.Fragment>
        <h1>Este es el home de la aplicación</h1>
        <Link to='/createNote'>Create a note</Link>
        </React.Fragment>
    )
}