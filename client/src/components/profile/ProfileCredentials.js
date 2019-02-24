import React, { Component } from 'react'
import Moment from 'react-moment';
class ProfileCredentials extends Component {
  render() {

    const {experience, education} = this.props;
    let experienceContent = experience.map(exp => (
      <li className="list-group-item mb-4" key={exp._id}>
        <h4>{exp.title}</h4>
        <p><Moment format="DD/MM/YYYY">{exp.from}</Moment> - {exp.to === undefined || null ? (<span>now</span>): (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}</p>
        <p><strong>Position: </strong>{exp.title}</p>
        <p><strong>Location: </strong>{exp.location}</p>
        <p><strong>Descripation: </strong>{exp.descripation}</p>
      </li>
    ));
    let educationContent = education.map(edu => (
      <li className="list-group-item mb-4" key={edu._id}>
        <h4>{edu.degree}</h4>
        <p><Moment format="DD/MM/YYYY">{edu.from}</Moment> - {edu.to === undefined || null ? (<span>now</span>): (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}</p>
        <p><strong>Degree: </strong>{edu.degree}</p>
        <p><strong>Field of study: </strong>{edu.fieldOfStudy}</p>
        <p><strong>Descripation: </strong>{edu.descripation}</p>
      </li>
    ));;
    
    return (
        <div className="row">
        <div className="col-md-6">
          <h3 className="text-info text-center">Experience</h3>
           {experience.length > 0 ? (<ul className="list-group">{experienceContent}</ul>): (<p>No experience found with this user</p>)}
          </div>
          <div className="col-md-6">
          <h3 className="text-info text-center">Education</h3>
          {education.length > 0 ? (<ul className="list-group">{educationContent}</ul>): (<p>No experience found with this user</p>)}
          </div>
        </div>
    )
  }
}
export default ProfileCredentials;