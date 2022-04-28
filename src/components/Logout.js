import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import { Redirect } from 'react-router-dom';
import Navbar from './NavBar';

const Logout = () => {
    const location = useLocation()
    const closexit = location.state?.closeExit;  
    return <div data-testid='logout-1'>
        <Navbar/>
        {closexit ? (localStorage.removeItem("token")):(<Redirect to="/"/>)}
        <h1>You have been logged out</h1>
        <Link to = '/'><button className="button-19">Login Again</button></Link>        
    </div>;    
};

export default Logout;

