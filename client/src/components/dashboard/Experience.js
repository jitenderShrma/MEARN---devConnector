import React, { Component } from 'react'
import { withRouter } from 'react-router';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileAction';
import { connect } from 'react-redux';
class Experience extends Component {

  onDeleteClick(id) {
    this.props.deleteExperience(id, this.props.history);

  }
  render() {
    const experienceContent = this.props.experience.map(exp => (
          <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td><Moment format="DD/MM/YYYY">{exp.form}</Moment>{' '}
           - {' '}
           {exp.to ? (<Moment format="DD/MM/YYYY">{exp.to}</Moment>): 'now'}
           </td>
          <td><button onClick={this.onDeleteClick.bind(this,exp._id)} className="btn btn-danger" >Delete</button></td>
          </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
          <tr>
            <th>Company</th>
            <th >Title</th>
            <th >Years</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {experienceContent}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(null, {deleteExperience}) (withRouter(Experience));