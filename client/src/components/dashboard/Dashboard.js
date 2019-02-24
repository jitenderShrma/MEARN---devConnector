import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../common/Spinner';
import Experience from './Experience';
import Education from './Education';
import { getProfile } from '../../actions/profileAction';
import ProfileAction from './profileAction';
import { deleteProfile } from '../../actions/profileAction';
class Dashboard extends Component { 
  onDeleteClick(e){
    this.props.deleteProfile(this.props.history);    
  }
  componentDidMount(){
    this.props.getProfile(this.props.auth.user.id);   
  }
  render() {
    const { user} = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if(profile === null || profile === undefined || loading){
      dashboardContent=<Spinner/>
    } else {
      if(Object.keys(profile).length > 0){
        dashboardContent= (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileAction p_user={profile.user}/>
            <Experience
             experience = {profile.experience}
             profile = {profile}
             />
            <Education education = {profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
    )
  }
}
Dashboard.propstypes = {
  auth:PropTypes.string.isRequired,
  profile:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth:state.auth,
  profile:state.profile
});
export  default connect(mapStateToProps, {getProfile,deleteProfile}) (withRouter(Dashboard));
