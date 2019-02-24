import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldInput from '../common/TextFieldInput';
import TextAreaFieldInput from '../common/TextAreaFieldInput';
import SelectListInput from '../common/SelectListInput';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileAction';

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      displaySocialInput:false,
      handle: '',
      status: '',
      company: '',
      website: '',
      location: '',
      githubUsername: '',
      skills: '',
      bio: '',
      youtube: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  onChange = function(e){
    this.setState({[e.target.name] : e.target.value});
  }
  onSubmit = function(e){
    e.preventDefault();
    const newProfile = {
      handle: this.state.handle,
      status: this.state.status,
      company: this.state.company,
      location: this.state.location,
      website: this.state.website,
      githubUsername: this.state.githubUsername,
      skills: this.state.skills,
      bio: this.state.bio,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    }
    this.props.createProfile(newProfile, this.props.history);
  }
  render() {
    const { errors } = this.props;
    const options=[
      {label: '* Select you professional', value: 0},
      {label: 'Devloper', value: 'Devloper'},
      {label: 'Junior Devloper', value: 'Junior Devloper'},
      {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
      {label: 'Software Enginer', value: 'Software Enginer'},
      {label: 'Web Desginer', value: 'Web Desginer'},
      {label: 'Student or Learner', value: 'Student or Learner'},
      {label: 'Intern', value: 'Intern'},
      {label: 'Other', value: 'Other'}
    ];
    let socialInputs;
    if(this.state.displaySocialInput){
      socialInputs = (
        <div>
          <InputGroup
          name="twitter"
          value={this.state.twitter}
          placeholder="Twitter"
          onChange={this.onChange}
          error={errors.twitter}
          icon="fab fa-twitter"
          />
          <InputGroup
          name="facebook"
          value={this.state.facebook}
          placeholder="Facebook"
          onChange={this.onChange}
          error={errors.facebook}
          icon="fab fa-facebook"
          />
          <InputGroup
          name="linkedin"
          value={this.state.linkedin}
          placeholder="Linkedin"
          onChange={this.onChange}
          error={errors.linkedin}
          icon="fab fa-linkedin"
          />
          <InputGroup
          name="youtube"
          value={this.state.youtube}
          placeholder="Youtube"
          onChange={this.onChange}
          error={errors.youtube}
          icon="fab fa-youtube"
          />
          <InputGroup
          name="instagram"
          value={this.state.instagram}
          placeholder="Instagram"
          onChange={this.onChange}
          error={errors.instagram}
          icon="fab fa-instagram"
          />
        </div>
      )
    }
    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">Create Your Profile</h1>
                <p className="lead text-center">Let's get some information to make your profile stand out</p>
                <small className="d-block pb-3">* = required field</small>
                <form onSubmit = {this.onSubmit}>
                    <TextFieldInput
                    type="text"
                    placeholder="* Profile handle"
                    name="handle"
                    error={errors.handle}
                    onChange = {this.onChange}
                    value= {this.state.handle}
                    info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                    />
                    <SelectListInput
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    error={errors.status}
                    options={options}
                    info="Given some idea where are in you carear"
                    />
                    <TextFieldInput
                    type="text"
                    className="form-control form-control-lg" placeholder="Company"
                    name="company"
                    onChange = {this.onChange}
                    value = {this.state.company}
                    info="Could be your own company or one you work for"
                    error={errors.company}
                    />
                    <TextFieldInput
                    type="text"
                    placeholder="Website"
                    name="website"
                    onChange={this.onChange}
                    value={this.state.website}
                    info="Could be your own or a company website"
                    error={errors.website}
                    />
                    <TextFieldInput
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Location"
                    name="location"
                    onChange = {this.onChange}
                    value = {this.state.location}
                    info="City & state suggested (eg. Boston, MA)"
                    error={errors.location}
                    />
                    <TextFieldInput
                    type="text"
                    placeholder="Skills"
                    name="skills"
                    onChange={this.onChange}
                    value={this.state.skills}
                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                    error={errors.skills}
                    />
                    <TextFieldInput
                    type="text"
                    placeholder="Github Username" name="githubUsername"
                    onChange={this.onChange}
                    value={this.state.githubUsername}
                    info="If you want your latest repos and a Github link, include your username"
                    error={errors.githubUsername}
                    />
                    <TextAreaFieldInput
                    placeholder="A short bio of yourself" name="bio"
                    vaue={this.state.bio}
                    error={errors.bio}
                    info="Tell us a little about yourself"
                    onChange={this.onChange}
                    />
                  <div className="mb-3">
                   <input type="button"
                   className="btn btn-light"
                   value="Add social network links"
                   onClick = {
                     () => {
                       this.setState(prevState =>({
                         displaySocialInput:!prevState.displaySocialInput
                       }))
                     }
                   }
                   />
                   <span className="text-muted">Optional</span>
                  </div>
                  {socialInputs}
                  <button className="btn btn-info btn-block p-2">Submit Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
CreateProfile.proptypes = {
  createProfile:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, {createProfile}) (withRouter(CreateProfile));
