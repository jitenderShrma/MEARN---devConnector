import {SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validator/is-empty';

const initialState = {
  isAuthenticate:false,
  user:{}
}

const authReducer = function(state = initialState, action){
  switch(action.type){
    default: 
    return state;
    case SET_CURRENT_USER:
    return{
      ...state,
      isAuthenticate:!isEmpty(action.payload),
      user:action.payload
    }
  }
}
export default authReducer;