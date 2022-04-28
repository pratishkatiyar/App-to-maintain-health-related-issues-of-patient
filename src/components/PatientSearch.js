import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import patientsJson from '../db.json'

export default class PatientSearch extends Component {
    constructor(props){
        super(props)
        this.state={
            patientID: '',
            patientData: {},
            prData: {},
            searchpd: false,
            searchprd: false,
            redirectRegisterPatient: false
        }
        this.onChange = this.onChange.bind(this)
        this.patientSearch = this.patientSearch.bind(this)
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        
        this.setState({
            patients: patientsJson.patients
        })
        this.setState({
            prescriptions: patientsJson.prescriptions
        })
        
    }

    patientSearch(e){
        e.preventDefault()
        const { patientID } = this.state;
        const { patients } = this.state;
        const { prescriptions } = this.state;
        const patientData = patients.find(patient => patient.id === parseInt(patientID) || patient.contact === parseInt(patientID)) || null;        
        if(patientData){
            const prData = prescriptions.find(prescription => patientData.contact === parseInt(prescription.id)) || null;
            this.setState(
                {
                    patientData,
                    searchpd: true
                }
            )
            if(prData){                
                this.setState({prData,searchprd: true})
            }
        }
        else{
            alert("Patient doesn't exists");
            this.setState({redirectRegisterPatient: true})
        }
    }
    render() {
        if(this.state.loggedIn===false){
            return <Redirect to="/"/>
        }else{
            const itemStr = localStorage.getItem("token")
            if(itemStr===null){
                return <Redirect to="/"/>
            }else   if(itemStr){
                const item = JSON.parse(itemStr)
                const now = new Date()
                if (now.getTime() > item.expiry) {
                    return <Redirect to="/SessionExpired"/>
                }
            }         
        }
        if(this.state.redirectRegisterPatient){
            return <Redirect to="/RegisterPatient"/>;
        }
        return (
            <div>
                <nav>
                    <div className ='logo'>
                        <p><Link to = '/'>Home</Link></p>
                    </div>
                    <div className='logo'>Patient Registration App</div>
                    <div><Link to="/logout">Logout</Link></div>
                </nav>
                
                <section data-testid='patientsearch-1'><h1><u>Search Patient</u></h1></section>

                <section>
                    <div>
                        <div>
                            <form action='' onSubmit={this.patientSearch}>
                                <div className='dashboard'>
                                    <div className="container">
                                        <div className="search-box">
                                            <input type="text" className="search-input" name="patientID"
                                            id="patientID" placeholder="Enter patient id/contact..."
                                            autoComplete='off' 
                                            value={this.state.patientID} onChange={this.onChange}/>

                                            <button className="search-button" type='submit'>
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>                
                            </form>  
                        </div>
                    </div>
                </section>

                <div className='patient'>                  

                    {(this.state.searchpd ? 
                        <div className="mainDiv">
                            <u><strong>Patient Details</strong></u>:-<br/><br/>
                            <center><table border="1">
                                <tr>
                                    <th>Patient Name</th>
                                    <th><div>{this.state.patientData.name}</div></th>
                                </tr>
                                <tr>
                                    <th>Patient ID</th>
                                    <th><div>{this.state.patientData.id}</div></th>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <th><div>{this.state.patientData.contact}</div></th>
                                </tr>
                                <tr>
                                    <th>Patient Age</th>
                                    <th><div>{this.state.patientData.age}</div></th>                                    
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <th><div>{this.state.patientData.gender}</div></th>                                    
                                </tr>
                                <tr>
                                    <th>Patient Height</th>
                                    <th><div>{this.state.patientData.height}</div></th>                                    
                                </tr>
                                <tr>
                                    <th>Patient Weight</th>
                                    <th><div>{this.state.patientData.weight}</div></th>
                                </tr>
                                <tr>
                                    <th>Body mass index(BMI)</th>
                                    <th><div>{this.state.patientData.bmi}</div></th>
                                </tr>
                                <tr>
                                    <th>Body Type</th>
                                    <th><div>{this.state.patientData.body_type}</div></th>
                                </tr>
                                <tr>
                                    <th>Disease</th>
                                    <th><div>{this.state.patientData.disease}</div></th>
                                </tr>
                                <tr>
                                    <th>Pre-Diagonised Disease</th>
                                    <th><div>{this.state.patientData.pdisease}</div></th>
                                </tr>
                                <tr>
                                    <th>Disabilities</th>
                                    <th><div>{this.state.patientData.disabilities}</div></th>
                                </tr>
                            </table></center>
                        </div>
                        : null)}

                        <br/><br/><br/><br/>
                    
                        {(this.state.searchprd ? 
                        <div className="mainDiv">
                        <u><strong>Prescription Details</strong></u>:-<br/><br/>
                            <center><table border="1">
                                <tr>
                                    <th>Prescription ID</th>
                                    <th><div>{this.state.prData.prid}</div></th>
                                </tr>
                                <tr>
                                    <th>Start Date</th>
                                    <th><div>{this.state.prData.start_date}</div></th>
                                </tr>
                                <tr>
                                    <th>Disease</th>
                                    <th><div>{this.state.prData.disease}</div></th>                                    
                                </tr>
                                <tr>
                                    <th>Drug Name</th>
                                    <th><div>{this.state.prData.drug}</div></th>                                    
                                </tr>
                                <tr>
                                    <th>Duration(No. of days)</th>
                                    <th><div>{this.state.prData.duration}</div></th>                                    
                                </tr>
                                <tr>
                                    <th>Frequency(In one day)</th>
                                    <th><div>{this.state.prData.frequency}</div></th>
                                </tr>
                                <tr>
                                    <th>Dose(in milligrams)</th>
                                    <th><div>{this.state.prData.dose}</div></th>
                                </tr>
                                <tr>
                                    <th>When to take drug</th>
                                    <th><div>{this.state.prData.when}</div></th>
                                </tr>
                                <tr>
                                    <th>End Date</th>
                                    <th><div>{this.state.prData.end_date}</div></th>
                                </tr>
                               
                            </table></center>
                        </div>
                        : null)}

                        <br/><br/><br/><br/>
                    
                </div>
                
            </div>
        )
    }
}
