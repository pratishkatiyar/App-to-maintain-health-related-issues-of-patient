import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './NavBar';

function NotFound() {
    return (
        <div data-testid='notFound-1'>
            <Navbar/>
            <h1>
                404 error<br/>Page not found.<br/>
            </h1>            
        </div>
    )
}

export default NotFound
