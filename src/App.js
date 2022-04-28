import React from 'react'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login'
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard'
import Logout from './components/Logout'
import PatientSearch from './components/PatientSearch';
import RegisterPatient from './components/RegisterPatient';
import Prescription from './components/Prescription';
import SessionExpired from './components/SessionExpired';
  
function App() {
  return (
    <BrowserRouter>
      <div className="App">        
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/logout" component={Logout} />
          <Route path="/PatientSearch" component={PatientSearch} />
          <Route path="/RegisterPatient" component={RegisterPatient} />          
          <Route path="/Prescription" component={Prescription} />        
          <Route path="/SessionExpired" component={SessionExpired} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
