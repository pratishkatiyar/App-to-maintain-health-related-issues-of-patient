import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../App.css';

export default class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn: true
        }
    }
    
    render() {
        if(this.state.loggedIn===false){
            return <Redirect to="/"/>
        }else{
            const itemStr = localStorage.getItem("token")
            const item = JSON.parse(itemStr)
            const now = new Date()
            if (now.getTime() > item.expiry) {
                return <Redirect to="/SessionExpired"/>
            }
        }

        return (
            <div data-test-id='dashboard-1'>
                <nav>
                    <div className ='logo'>
                        <p><Link to = '/'>Home</Link></p>
                    </div>
                    <div className='logo'>Patient Registration App</div>
                    <div><Link to={{pathname:"/logout", state: { closeExit: true } }}>Logout</Link></div>
                </nav>
                
                <section><h1><u>Dashboard</u></h1></section>
                
                <div className='mydiv'>
                    <Link to = '/PatientSearch/'><button className="button-18">Search Patient</button></Link>
                    <Link to = '/RegisterPatient/'><button className="button-18">Add new Patient</button></Link>
                    <Link to = '/Prescription/'><button className="button-18">Add new prescription</button></Link>
                </div>
            </div>
        )
    }
}
