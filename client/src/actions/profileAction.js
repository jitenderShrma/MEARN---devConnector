import axios from 'axios';
import {
   GET_ERRORS,
   GET_PROFILE,
   CLEAR_CURRENT_PROFILE,
   PROFILE_LOADING,
   GET_CURRENT_PROFILE,
   GET_PROFILES } from '../actions/types';

// create profile
export const createProfile = (newProfile, history) => dispatch => {
  axios.post('/api/profile/create', newProfile)
    .then(() => {
      history.push('/dashboard')})
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
}
// to get profile by user_id
export const getProfile = user_id => dispatch => {
  dispatch({type:PROFILE_LOADING});
  axios.get(`/api/profile/user_id/${user_id}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(error => dispatch({
      type: GET_PROFILE,
      payload: {}
    }));
}

// get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch({type:PROFILE_LOADING});
  axios.get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({
      type:GET_PROFILE,
      payload:res.data
    }))
    .catch(() => dispatch({
      type:GET_PROFILE,
      payload:{}
    }));
}

// add experience
export const addExperience = (addExp, history) => dispatch =>{
  axios.post('/api/profile/experience', addExp)
    .then( profile => history.push('/dashboard'))
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
}
// add education
export const addEducation = (addEdu, history) => dispatch =>{
  axios.post('/api/profile/education', addEdu)
    .then( () => history.push('/dashboard'))
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
}

// delete experience
export const deleteExperience = (exp_id, history) => dispatch =>{
  axios.delete(`/api/profile/experience/${exp_id}`)
    .then( res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.data
    }));
}
// delete education
export const deleteEducation = (edu_id, history) => dispatch =>{
  axios.delete(`/api/profile/education/${edu_id}`)
    .then( res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    }));
}
// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch({type: PROFILE_LOADING,payload:{}});
  dispatch({type:GET_ERRORS,payload:{}});
  axios
    .get('/api/profile/getCurrentProfile')
    .then(res =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      })
    )
    .catch(() =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
// get all profiles
export const getAllProfiles = () => dispatch => {
  dispatch({type: PROFILE_LOADING});
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(() =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
// delete profile
export const deleteProfile = history => dispatch => {
  dispatch({type: CLEAR_CURRENT_PROFILE})
  axios.delete('/api/profile/delete')
    .then(() => window.location.href="/");
};
// delete profile

export const clearCurrentProfile = () => {
  return {
      type: CLEAR_CURRENT_PROFILE
  };
}

