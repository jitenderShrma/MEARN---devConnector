import React, { Component } from 'react'

export default class AboutProfile extends Component {
  render() {
    const { user } = this.props;
    const { profile } = this.props;
    let skills = profile.skills.map((skill, i) => (
      <div className="p-3" key={i}><i className="fa fa-check"></i>{skill}</div>
    ))
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-light mb-4">
              <h4 className="text-info text-center">{user.name} Bio</h4>
              <p>{profile.bio ? (<span>{profile.bio}</span>): (<span>{user.name} does not have a bio</span>)}</p>
              <hr></hr>
              <h4 className="text-info text-center">Skills</h4>
              <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
