import React, { Component } from 'react'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteEducation } from '../../actions/profileAction';
class Education extends Component {
  onDeleteClick(id){
    this.props.deleteEducation(id);
  }
  render() {
    const educationContent = this.props.education.map(edu => (
          <tr key={edu._id}>
          <td>{edu.degree}</td>
          <td>{edu.school}</td>
          <td><Moment format="DD/MM/YYYY">{edu.form}</Moment>{' '}
           - {' '}
           {edu.to ? (<Moment format="DD/MM/YYYY">{edu.to}</Moment>): 'now'}
           </td>
          <td><button  className="btn btn-danger" onClick= {this.onDeleteClick.bind(this, edu._id)} >Delete</button></td>
          </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
          <tr>
            <th className="mr-4">Degree</th>
            <th  className="ml-4">School</th>
            <th  className="mr-4">Years</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {educationContent}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(null, {deleteEducation}) (withRouter(Education));