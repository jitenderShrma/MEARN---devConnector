import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import setAuthHeader from '../utilitys/setAuthHeader';
// import authReducer from '../reducers/errorReducer';

// register user
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register/', userData)
    .then(() => history.push('/login'))
    .catch(err =>dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    }));
}

// login user
export const loginUser = (userData, history) => dispatch => {
  axios.post('/api/users/login',userData)
    .then(res => {
      // token
      const token = res.data.token;      
      // save to localStorage
      window.localStorage.setItem('jwtToken',token);
      // set in header
      setAuthHeader(token);
      // decode to token
      const decoded = jwt_decode(token);
      // dispatch to store
      dispatch(setCurrentUser(decoded));
      // redirect to dashboard
      history.push('/dashboard');
    })
    .catch(error => dispatch({
      type:GET_ERRORS,
      payload:error.response.data
    }));
}
// logout user
export const logoutUser = () => dispatch => {
  // remove token
  window.localStorage.removeItem('jwtToken');
  // set current user
  setAuthHeader(false);
};

export const setCurrentUser = decoded => {
  return {
    type:SET_CURRENT_USER,
    payload:decoded
  }
};
