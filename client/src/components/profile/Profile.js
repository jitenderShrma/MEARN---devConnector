import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileAction';
import ProfileHeader from './ProfileHeader';
import AboutProfile from './AboutProfile';
import ProfileCredentials from './ProfileCredentials';
class Profile extends Component {
  componentDidMount(){
    this.props.getProfileByHandle(this.props.match.params.handle);
  }
  render(){
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;
    
    let profileContent;
    if(profile === null || profile === undefined || loading){
      profileContent = <Spinner/>
    } else {
      profileContent = (
        <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
          <ProfileHeader user = {user} profile = {profile} />
          <AboutProfile profile={profile} user={user}/>
          <ProfileCredentials experience ={profile.experience} education ={profile.education}/> 
        </div>
      );
    }
    return(
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    )
  }
}
Profile.proptypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile:state.profile,
  auth:state.auth
});

export default connect(mapStateToProps, {getProfileByHandle}) (Profile);