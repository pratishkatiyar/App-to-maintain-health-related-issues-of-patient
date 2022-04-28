import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export class Prescription extends Component {
    constructor(props){
        super(props)
        this.state={
            prid: "",
            id: "",
            start_date: "",
            disease: "",
            drug: "",
            duration: "",
            frequency: "",
            dose: "",
            when: "" ,
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

    async handleSubmit(evt){
        evt.preventDefault();
        const { redirec } = this.state;
        let isnum = /^\d+$/.test(this.state.id);
        let thisDate= new Date();
        let checkDate=new Date(this.state.start_date);
        if((this.state.id)==="" || !this.state.start_date || !this.state.disease || !this.state.drug || !this.state.duration || !this.state.frequency || !this.state.dose || !this.state.when)    alert("Please enter all the necessary details.")
        else if(parseInt(this.state.id)>9999999999 || parseInt(this.state.id)<1000000000 || (this.state.id)===null || !isnum)    alert("Please enter valid contact number.")
        else if(thisDate>checkDate) alert("You cannot enter a date in the past!");
        else{
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '_' + mm + '_' + dd + '_';
            var randomNumber = Math.floor((Math.random() * 10000) + 10000);

            let startDate=this.state.start_date;
            let timeDuration=this.state.duration;
            var ms = new Date(startDate).getTime() + (86400000*timeDuration);
            var nextdate = new Date(ms);     
            let myFutureDate = new Date(nextdate);  
            dd = String(myFutureDate.getDate()).padStart(2, '0');
            mm = String(myFutureDate.getMonth() + 1).padStart(2, '0');
            yyyy = myFutureDate.getFullYear();
            myFutureDate = yyyy + '-' + mm + '-' + dd;

            const pdata={
                "prid": today + randomNumber,
                "id": parseInt(this.state.id), 
                "start_date": this.state.start_date, 
                "disease": this.state.disease, 
                "drug": this.state.drug, 
                "duration": parseInt(this.state.duration), 
                "frequency": parseInt(this.state.frequency), 
                "dose": this.state.dose,
                "when": this.state.when, 
                "disabilities": this.state.disabilities,
                "end_date":  myFutureDate
            };            

            const headers = {
                'Content-Type': 'application/json'
            }
            const url = "http://localhost:3500/prescriptions";

            try 
            {
                const data = await axios.post(url, pdata, { headers: headers})
                alert("Successfully added new prescription.")                
                this.setState({redirec: true})
                this.state.redirec=true;
            } 
            catch(error) 
            {
                console.log(error.message);
            }
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
    if(this.state.redirec===true){
        return <Redirect to="/"/>
    }
    return <div data-testid='prescription-1'>
    <nav>
            <div className ='logo'>
                <p><Link to = '/'>Home</Link></p>
            </div>
            <div className='logo'>Patient Registration App</div>
            <div><Link to="/logout">Logout</Link></div>
        </nav>
        
        <section><h1><u>Please Enter Patient's Prescription Details:</u></h1></section>
        <br/><br/><br/><br/>
        <form onSubmit={this.handleSubmit}>
            <table border="1">
            <tr>
                <th style={{ width: '9%' }}>Contact</th>
                <th style={{ width: '12%' }}>Disease</th>
                <th style={{ width: '12%' }}>Medicine</th>                        
                <th style={{ width: '6%' }}>Duration<br/>(in days)</th>
                <th style={{ width: '10%' }}>Frequency (no. of times)</th>
                <th style={{ width: '6%' }}>Start Date</th>
                <th style={{ width: '6%' }}>Dose<br/>(in mg)</th>
                <th style={{ width: '8%' }}>When to take</th>
            </tr>

            <tr>
                <td>
                    <input
                        style={{ width: '90%' }}
                        name='id' 
                        placeholder='Phone Number..'
                        value={this.state.id}
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
                        name="drug" 
                        placeholder="Medicine.."
                        value={this.state.drug}
                        onChange={this.handleChange}
                    />
                </td>
                <td>
                    <input
                        style={{ width: '80%' }}
                        type="number"
                        min="1" 
                        max="400"
                        name='duration' 
                        placeholder='Duration..'
                        value={this.state.duration}
                        onChange={this.handleChange}
                    />
                </td>

                <td>
                    <input
                        style={{ width: '90%' }}
                        type="number"
                        min="1" 
                        max="4"
                        name='frequency' 
                        placeholder='Frequency..'
                        value={this.state.frequency}
                        onChange={this.handleChange}
                    />
                </td>
                
                <td>
                    <input
                        style={{ width: '88%' }}
                        id='start_date'
                        name='start_date' 
                        type="date" 
                        data-date-inline-picker="true"
                        placeholder='Start Date..'
                        value={this.state.start_date}
                        onChange={this.handleChange}
                    />
                </td>

                <td>
                    <select name="dose" style={{ width: '75%' }} onChange={this.handleChange} value={this.state.dose}>
                    <option value="50 mg">50 mg</option>
                    <option value="100 mg">100 mg</option>
                    <option value="150 mg">150 mg</option>
                    <option value="200 mg">200 mg</option>
                    <option value="250 mg">250 mg</option>
                    <option value="300 mg">300 mg</option>
                    <option value="350 mg">350 mg</option>
                    <option value="400 mg">400 mg</option>
                    <option value="450 mg">450 mg</option>
                    <option value="500 mg">500 mg</option>              
                    </select>
                </td>                        

                <td style={{ width: '11%' }}>
                    Before Meal<input type="checkbox" value="Before Meal" name="when" checked={this.state.when === "Before Meal"} onChange={this.handleChange}/><br/> 
                    After Meal<input type="checkbox" value="After Meal" name="when" checked={this.state.when === "After Meal"} onChange={this.handleChange}/>
                </td>    
            </tr>            
            </table>
            <section style={{ padding: '2%' }}><button type="submit">Add prescription</button></section>
        </form>

</div>
  }
}

export default Prescription;