import { CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING, GET_CURRENT_PROFILE, GET_PROFILES } from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

const profileReducer = function(state = initialState, action){
  switch(action.type){
    default:
      return state;
    case CLEAR_CURRENT_PROFILE :
    return state;
    case PROFILE_LOADING:
    return { loading:true }
    case GET_CURRENT_PROFILE:
      return {
        profile: action.payload,
        loading: false
      }
    case GET_PROFILE:
    return {
      ...state,
      profile:action.payload,
      loading:false
    }
    case GET_PROFILES:
    return{
      profiles: action.payload,
      loading: false,
    }
  }
}
export default profileReducer;

