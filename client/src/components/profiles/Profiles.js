import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfilesItem from './ProfilesItem';
import { getAllProfiles } from '../../actions/profileAction';
class Profiles extends Component {
  componentWillMount() {
    this.props.getAllProfiles();
  }
  
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || profiles === undefined || loading) {
      profileItems = <Spinner />;
    } else {
      if (Object.keys(profiles).length > 0) {
        profileItems = profiles.map(profile => (
          <ProfilesItem key={profile._id} profile={profile}/>
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Profiles.proptypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(withRouter(Profiles));