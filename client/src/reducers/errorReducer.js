import { GET_ERRORS, CLEAR_ERROR } from '../actions/types';
const errors={};

const authReducer = function(state = errors, action){
  switch(action.type){
    default: 
    return state
    case GET_ERRORS:
    return action.payload
    case CLEAR_ERROR:
    return {
      state
    }
  }
}
export default authReducer;