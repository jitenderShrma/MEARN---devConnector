import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {registerUser } from '../../actions/authAction';
class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors:{}
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
  }
  onValueChange(e){
    this.setState({[e.target.name] : e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    const newUser = {
      name : this.state.name,
      email : this.state.email,
      password : this.state.password,
      conformPassword : this.state.password2
    }
     this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const  {errors}  = this.state;
    return (
      <div className="register">
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your DevConnector account</p>
                <form onSubmit = {this.onSubmit} >
                  <div className="form-group">
                    <input
                    type="text"
                    className={classnames('form-control form-control-lg',{
                      'is-invalid':errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange= {this.onValueChange}
                    />
                    <div className="invalid-feedback">{errors.name}</div>
                  </div>
                  <div className="form-group">
                    <input
                    type="email" 
                    className={classnames('form-control form-control-lg',{'is-invalid':errors.email
                  })}  
                    placeholder="Email Address" 
                    name="email"
                    value = {this.state.email} 
                    onChange= {this.onValueChange}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  </div>
                  <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg',{'is-invalid': errors.password})}
                    placeholder="Password"
                    name = "password"
                    value = {this.state.password}
                    onChange = {this.onValueChange}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                  </div>
                  <div className="form-group">
                    <input
                    type="password"
                    className={classnames('form-control form-control-lg',{'is-invalid':errors.conformPassword})} 
                    placeholder="Confirm Password"
                    name="password2"
                    value = {this.state.password2}
                    onChange = {this.onValueChange}
                    />
                    <div className="invalid-feedback">{errors.conformPassword}</div>
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired
}
const stateToProps = state => ({
  errors:state.errors
});
export default connect(stateToProps, {registerUser}) (withRouter(Register));