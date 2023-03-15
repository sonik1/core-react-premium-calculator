import React, { Component } from 'react';
import moment from 'moment';
export class FetchData extends Component {
  static displayName = FetchData.name;

  // constructor(props) {
  //   super(props);
  //   this.state = { forecasts: [], loading: true };
  // }

  constructor() {
    super();
    this.state = {
      formFields: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthDate: '',
        occupation:'',
        sumInsured:''
      },
      errors: {},
      premium:{
        amount:'',
        tpdAmount:''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

   // When any field value changed
  handleChange(event) {
    let formFields = this.state.formFields;
    formFields[event.target.name] = event.target.value;
    this.setState({
      formFields
    });
  }

  // To validate all form fields
  validate() {
    let formFields = this.state.formFields;
    let errors = {};
    let IsValid = true;

    if (!formFields["firstName"]) {
      IsValid = false;
      errors["firstName"] = "Enter Your First Name";
    }

    if (!formFields["lastName"]) {
      IsValid = false;
      errors["lastName"] = "Enter Your Last Name";
    }

    if (!formFields["email"]) {
      IsValid = false;
      errors["email"] = "Enter Your Email";
    }

    if (!formFields["password"]) {
      IsValid = false;
      errors["password"] = "Enter The Age";
    }

    // if (!formFields["birthDate"]) {
    //   IsValid = false;
    //   errors["birthDate"] = "Select Date of Birth";
    // }

    if (!formFields["occupation"]) {
      IsValid = false;
      errors["occupation"] = "Select Occupation";
    }

    if (!formFields["sumInsured"]) {
      IsValid = false;
      errors["sumInsured"] = "Enter Sum Insured";
    }

    this.setState({
      errors: errors
    });
    return IsValid;
  }
   // When user submits the form after validation
  async handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      let fields = this.state.formFields;
      let url = `weatherforecast?occupation=${fields.occupation}&age=${fields.password}&sumInsured=${fields.sumInsured}`

      const response = await fetch(url);
      const data = await response.json();
      if(data){
        let state = this.state;

        state['premium']['amount'] = (data.amount).toFixed(4);
        state['premium']['tpdAmount'] = (data.tpdAmount).toFixed(4);
        this.setState(state);
      }


      let formFields = {};
      formFields["firstName"] = "";
      formFields["lastName"] = "";
      formFields["email"] = "";
      formFields["password"] = "";
      formFields["birthDate"] = "";
      formFields["occupation"] = "";
      formFields["sumInsured"] = "";
      this.setState({ formFields: formFields });
    }

  }

  render() {
    return (
      <div className="container" style={{ width: '600px' }}>
        <h3>Premium Calculator</h3>
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label>First Name</label>
            <input className="form-control"
              type="text"
              name="firstName"
              value={this.state.formFields.firstName}
              onChange={this.handleChange} />
            {this.state.errors.firstName &&
              <div className="alert alert-danger">
                {this.state.errors.firstName}
              </div>
            }
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control"
              type="text"
              name="lastName"
              value={this.state.formFields.lastName}
              onChange={this.handleChange} />
            {this.state.errors.lastName &&
              <div className="alert alert-danger">
                {this.state.errors.lastName}
              </div>
            }
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control"
              type="text"
              name="email"
              value={this.state.formFields.email}
              onChange={this.handleChange} />
            {this.state.errors.email &&
              <div className="alert alert-danger">
                {this.state.errors.email}
              </div>
            }
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input className='form-control' name='dob' type="date" ref={(date) => {this.dateRef = date;}} value={this.state.birthDate} onChange={this._onDateChange.bind(this)} max={moment().format("YYYY-MM-DD")}/>
            {this.state.errors.birthDate &&
              <div className="alert alert-danger">
                {this.state.errors.birthDate}
              </div>
            }
          </div>
          <div className="form-group">
            <label>Age</label>
            <input className="form-control"
              type="text"
              name="password"
              value={this.state.formFields.password}
              onChange={this.handleChange} />
            {this.state.errors.password &&
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            }
          </div>

          <div className="form-group">
            <label>Occupation</label>
            <select className="form-control" name='occupation' value={this.state.formFields.occupation} onChange={this.handleChange}>
              <option value="" >Select Occupation</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Doctor">Doctor</option>
              <option value="Author">Author</option>
              <option value="Farmer">Farmer</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Florist">Florist</option>
            </select>
            {this.state.errors.occupation &&
              <div className="alert alert-danger">
                {this.state.errors.occupation}
              </div>
            }
          </div>

          <div className="form-group">
            <label>Sum Insured</label>
            <input className="form-control"
              type="number"
              name="sumInsured"
              min="1"
              value={this.state.formFields.sumInsured}
              onChange={this.handleChange} />
            {this.state.errors.sumInsured &&
              <div className="alert alert-danger">
                {this.state.errors.sumInsured}
              </div>
            }
          </div>
          <br />
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
        
        <br></br>
        {this.state.premium.amount ? <h4>Total Premium is: {this.state.premium.amount}</h4> : null}
        {this.state.premium.tpdAmount ? <h4>TPD Amount Monthly is: {this.state.premium.tpdAmount}</h4> : null}
      </div >
      
    );
  }

  _onDateChange(e) {
    let state = this.state;
    state['birthDate'] = e.target.value;

    var dob = new Date(e.target.value);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    state['formFields']['birthDate'] = this.dateRef.value;
    state['formFields']['password'] = age;
    this.setState(state);
}

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
