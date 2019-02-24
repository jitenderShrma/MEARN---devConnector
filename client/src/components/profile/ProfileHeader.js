import React, { Component } from 'react'
import isEmpty from '../../validator/is-empty';
class ProfileHeader extends Component {
  render() {
    const { user } = this.props;
    const { profile } = this.props;
    return (
      <div>
        <div class="row">
          <div class="col-md-12">
            <div class="card card-body bg-info text-white">
              <div class="row">
                <div class="col-4 col-md-3 m-auto">
                  <img class="rounded-circle" src={user.avatar} alt="" />
                </div>
              </div>
              <div class="text-center">
                <h1 class="display-4 text-center">{user.name}</h1>
                <p class="lead text-center"> {profile.status} {profile.company ? (<span>at {profile.company}</span>): ''}</p>
                <p>{profile.location}</p>
                <p>
                  {profile.website ? (<a class="text-white p-2" href={profile.website} target="_blank">
                    <i class="fas fa-globe fa-2x"></i>
                  </a>) : ''}
                  {isEmpty(profile.social && profile.social.twitter) ? null : (<a class="text-white p-2" href={profile.social.twitter}  target="_blank">
                    <i class="fab fa-twitter fa-2x"></i>
                  </a>)}
                  {isEmpty(profile.social && profile.social.facebook) ? null : (<a class="text-white p-2" href={profile.social.facebook} target="_blank">
                    <i class="fab fa-facebook fa-2x"></i>
                  </a>)}
                  {isEmpty(profile.social && profile.social.linkedin) ? null :(<a class="text-white p-2" href={profile.social.linkedin} target="_blank">
                    <i class="fab fa-linkedin fa-2x"></i>
                  </a>)}
                  {isEmpty(profile.social && profile.social.instagram) ? null : (<a class="text-white p-2" href={profile.social.instagram} target="_blank">
                    <i class="fab fa-instagram fa-2x"></i>
                  </a>)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProfileHeader;
