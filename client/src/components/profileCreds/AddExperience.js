import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addExperience } from '../../actions/profileAction';
import TextFieldInput from '../common/TextFieldInput';
import TextAreaFieldInput from '../common/TextAreaFieldInput';

class AddExperience extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      description: '',
      disabled: false,
      current: false,
      errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  }
  onSubmit = function(e) {
    e.preventDefault();
    const newExp = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    }
    this.props.addExperience(newExp, this.props.history);
  }
  onChange = function(e) {
    this.setState({[e.target.name]:e.target.value})
  }
  onCheck = function(e){
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit = {this.onSubmit}>
                <TextFieldInput
                type = "text"
                name='title'
                placeholder='* Title'
                error ={errors.title}
                value = {this.state.title}
                onChange = {this.onChange}
                />
                <TextFieldInput
                type="text"
                placeholder="* Company"
                name="company"
                onChange = {this.onChange}
                value = {this.state.company}
                error = {errors.company}
                />
                <TextFieldInput
                type="text"
                placeholder="Location"
                name="location"
                onChange = {this.onChange}
                value = {this.state.location}
                error = {errors.location}
                />
                <h6>From Date</h6>
                <TextFieldInput
                type="date"
                placeholder="* From"
                name="from"
                onChange = {this.onChange}
                value = {this.state.from}
                error = {errors.from}
                />
                <h6>To Date</h6>
                <TextFieldInput
                type="date"
                placeholder="To"
                name="to"
                onChange = {this.onChange}
                value = {this.state.to}
                error = {errors.to}
                disabled = {this.state.disabled ? 'disabled' :''}
                />
                <div className="form-check mb-4">
                  <input 
                   className="form-check-input"
                   type="checkbox"
                   name="current"
                   value = {this.state.current}
                   checked = {this.state.current}
                   onChange = {this.onCheck}
                   id="current"
                    />
                  <label className="form-check-label" for="current">
                    Current Job
                </label>
                </div>
                <TextAreaFieldInput
                name = "description"
                placeholder = "Description"
                onChange = {this.onChange}
                value = {this.state.description}
                error = {errors.description}
                info = "add something about you experience etc."
                />
                <input type="submit" className="btn btn-info btn-block mt-4 mb-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
AddExperience.proptypes = {
  errors: PropTypes.object
}
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps, { addExperience }) (withRouter(AddExperience));