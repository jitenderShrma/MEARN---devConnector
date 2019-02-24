import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authAction';
import { clearCurrentProfile } from '../../actions/profileAction';
class Navbar extends Component {
  logoutUser = () => {
    this.props.logoutUser();
    this.props.clearCurrentProfile();
    window.location.href = '/login';
  }
  render() {
    const { auth } = this.props;
    const guestUser = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">Profiles</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );
    const authUser = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">post feed</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">Profiles</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
            <a href="" className="nav-link" onClick={this.logoutUser}>
              <img
               src = {auth.user.avatar}
               className="rounded-circle"
               style={{width:'25px', marginRight: '5px'}}
               title="You must have a Gravatar connected to your email to display an image"
               alt={auth.user.name}
              />{' '}
              logout
            </a>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            {auth.isAuthenticate ? authUser : guestUser}
          </div>
        </div>
      </nav>
    )
  }
}
Navbar.proptypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  atuh: PropTypes.object
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);



