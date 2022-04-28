import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from './NavBar';

const Login = () => {
    const [state, setState] = React.useState( { physicianID: "", password: "" } );
    const [loggedIn, setloggedIn] = useState(false);
    const [phydata, setphydata] = useState(null);
    
    function handleChange(evt) {
        evt.preventDefault();
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
    }

    useEffect(() => {
        getData();    
        async function getData() {
            const response = await fetch("http://localhost:3500/physicians");
            const data = await response.json();
    
            setphydata(data);
        }
      }, []);

    function submitLogin(e){
        e.preventDefault();
        let logIn=false;
        for (let item of phydata){
            if(item.physicianID===parseInt(state.physicianID) && item.password===state.password){
                setloggedIn(true);
                logIn=true;
                const now = new Date();
                const item = {
                    value: new Date().getTime().toString(),
                    expiry: now.getTime() + 86400000*2
                    // expiry: now.getTime() + 5000
                }
                localStorage.setItem("token", JSON.stringify(item));
            }
        }
        if(logIn===false) alert("Please enter correct physician login credentials!!")  
    }   	
    
    if(loggedIn===true || localStorage.getItem("token")!=null){
        return <Redirect to="/dashboard/" />
    }

    return (
        <div data-testid='login-1'>
            <Navbar/>
            <div className='dashdiv'>
                <form action='' onSubmit={submitLogin}>    
                    <label><b>Physician ID: </b></label>    
                    <input type="text" name="physicianID" placeholder="Physician ID.." value={state.physicianID} onChange={handleChange} /> 
                    <br/><br/>
                    <label><b>Password: </b></label>    
                    <input type="Password" name="password" placeholder="Password.." value={state.password} onChange={handleChange} />
                    <br/><br/> 
                    <input type="button" type="submit" value="Login" onChange={handleChange} />     
                </form>
            </div>
        </div>
    )
}

export default Login
