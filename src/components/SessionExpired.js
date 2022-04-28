import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import Navbar from './NavBar';

export default class SessionExpired extends Component {
    render() {
        const itemStr = localStorage.getItem("token")
        if(itemStr){
            const item = JSON.parse(itemStr)
            const now = new Date()
            if (now.getTime() < item.expiry) {
                return <Redirect to="/Dashboard"/>
            }else{
                localStorage.removeItem("token")
            }
        }        
        return (
            <div data-testid='sessionExpired-1'>
                <Navbar/>
                <h1>Session Expired.</h1>
                <Link to = '/'><button className="button-19">Login Again</button></Link>
            </div>
        )
    }
}
