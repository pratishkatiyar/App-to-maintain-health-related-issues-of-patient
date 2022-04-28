import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export class RegisterPatient extends Component {
    constructor(props){
        super(props)
        this.state={
            name: "",
            gender: "",
            age: "",
            contact: "",
            height: "",
            weight: "",
            disease: "",
            pdisease: "",
            disabilities: "", 
            redirec: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(evt) {
        evt.preventDefault();
        const value = evt.target.value;
        this.setState({
          ...this.state,
          [evt.target.name]: value
        });
    }

    handlecontact(evt){
        evt.preventDefault();


    }

    async handleSubmit(evt){
        evt.preventDefault();
        let isnum = /^\d+$/.test(this.state.contact);
        const { redirec } = this.state;
        if(!this.state.name || !this.state.age || !this.state.gender || !this.state.height || !this.state.weight || (!this.state.contact))  alert("Please enter all the necessary details.")
        else    if(parseInt(this.state.contact)>9999999999 || parseInt(this.state.contact)<1000000000 || (this.state.contact)===null || !isnum)    alert("Please enter valid contact number.")
        else{
            var bm=(this.state.weight)/((0.01*this.state.height)*(0.01*this.state.height));
            var btype="";
            if(bm<18)   btype="Underweight";
            else    if(bm>25)   btype="Overweight";
            else    btype="Normal Weight";
            const pdata={
                "id": parseInt(new Date().getTime().toString()), 
                "name": this.state.name, 
                "age": this.state.age, 
                "gender": this.state.gender, "height": this.state.height, "weight": this.state.weight, "disease": this.state.disease,
                "pdisease": this.state.pdisease, "disabilities": this.state.disabilities,
                "body_type": btype, "bmi": bm.toFixed(2), 
                "contact": parseInt(this.state.contact)
            };            
            const headers = {
                'Content-Type': 'application/json'
            }
        const url = "http://localhost:3500/patients";

        try {
                const data = await axios.post(url, pdata, { headers: headers})
                alert("Successfully added new patient.");
                this.setState({redirec: true})
                this.state.redirec=true;
                
            } catch(error) {
                console.log(error.message);
            }
        }
        console.log(this.state.redirec)

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
    if(this.state.redirec===true){
        return <Redirect to="/"/>
    }
    return <div>

        <nav>
            <div className ='logo'>
                <p><Link to = '/'>Home</Link></p>
            </div>
            <div className='logo'>Patient Registration App</div>
                <div><Link to="/logout">Logout</Link></div>
        </nav>

        <div data-testid='registerPatient'>      
        <section><h1><u>Please Enter New Patient Details:</u></h1></section>
        <br/><br/><br/><br/>
        <form onSubmit={this.handleSubmit}>
            <table border="1">
            <tr>
                <th style={{ width: '16%' }}>Name</th>
                <th style={{ width: '15%' }}>Gender</th>
                <th style={{ width: '6%' }}>Age</th>
                <th style={{ width: '11%' }}>Phone Number</th>
                <th style={{ width: '8%' }}>Height<br/>(in cm)</th>
                <th style={{ width: '8%' }}>Weight<br/>(in kg)</th>
                <th style={{ width: '14%' }}>Disease</th>
                <th style={{ width: '15%' }}>Pre-Diagonised Disease</th>
                <th>Disability</th>
            </tr>

            <tr>
                <td>
                <input
                    style={{ width: '90%' }}
                    name='name' 
                    placeholder='Name..'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                </td>

                <td style={{ width: '8%' }}>
                Male<input type="radio" value="Male" name="gender" checked={this.state.gender === "Male"} onChange={this.handleChange}/> 
                Female<input type="radio" value="Female" name="gender" checked={this.state.gender === "Female"} onChange={this.handleChange}/>
                </td>
            
                <td>
                <input
                    style={{ width: '80%' }}
                    type="number"
                    min="1" 
                    max="100"
                    name='age' 
                    placeholder='Age..'
                    value={this.state.age}
                    onChange={this.handleChange}
                />
                </td>
            
                <td>
                <input
                    style={{ width: '85%' }}
                    name='contact' 
                    placeholder='Phone Number..'
                    value={this.state.contact}
                    onChange={this.handlecontact}
                />
                </td>
            
                <td>
                <input
                    style={{ width: '70%' }}
                    type="number"
                    min="1" 
                    max="300"
                    name='height' 
                    placeholder='height..'
                    value={this.state.height}
                    onChange={this.handleChange}
                />
                </td>

                <td>
                <input
                    style={{ width: '70%' }}
                    type="number"
                    min="1" 
                    max="200"
                    name='weight' 
                    placeholder='weight..'
                    value={this.state.weight}
                    onChange={this.handleChange}
                />
                </td>
                
                <td>
                <textarea
                    style={{ width: '90%' }}
                    name="disease" 
                    placeholder="Disease.."
                    value={this.state.disease}
                    onChange={this.handleChange}
                />
                </td>

                <td>
                <textarea
                    style={{ width: '90%' }}
                    name="pdisease" 
                    placeholder="Pre-Diagonised Disease.."
                    value={this.state.pdisease}
                    onChange={this.handleChange}
                />
                </td>

                <td>
                <select name="disabilities" style={{ width: '75%' }} onChange={this.handleChange} value={this.state.disabilities}>
                <option value="None">None</option>
                <option value="By Birth">By Birth</option>
                <option value="By Accident">By Accident</option>                
                </select>
                </td>          
            
            </tr>            
            </table>
            <section style={{ padding: '2%' }}><button type="submit" id='newPatientSubmitButton'>Add new patient</button></section>
            
        </form>   
        </div>  
    </div>
  }
}

export default RegisterPatient;