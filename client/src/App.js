import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Footer from './components/layouts/Footer';
import Register from './components/users/Register';
import Profiles from './components/profiles/Profiles';
import Login from './components/users/Login';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import AddExperience from './components/profileCreds/AddExperience';
import AddEducation from './components/profileCreds/AddEducation';
import Store from './Store';
import {logoutUser} from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';
import setAuthHeader from './utilitys/setAuthHeader';


// set authHeader(token)
const jwt_token = localStorage.jwtToken;
if(jwt_token){
  // set to auth header
  setAuthHeader(jwt_token);
  // decode to token
}
// logoutUser
export const logout = () =>{
  
  Store.dispatch(clearCurrentProfile());
  window.location.href='/login';
}
// const decoded = jwt_decode(localStorage.jwtToken);
// const currentTime = Date.now()/1000
// if(decoded.exp < currentTime){
//   Store.dispatch(clearCurrentProfile());
//   logoutUser();
//     // Redirect to login
//   window.location.href = '/login';
// }

class App extends Component {
  render() {
    return (
      <Provider store = {Store} >
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact  path="/" component={Landing}/>
            <Route exact path="/profiles" component={Profiles}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/profile/:handle" component={Profile}/>
            <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            <PrivateRoute exact path="/edit-profile/:p_id" component={EditProfile}/>
            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
            <PrivateRoute exact path="/add-education" component={AddEducation}/>
            <PrivateRoute exact path="/feed" component={Posts}/>
            <PrivateRoute exact path="/comment/:p_id" component={Post}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
