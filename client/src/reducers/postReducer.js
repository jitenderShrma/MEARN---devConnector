import { GET_POST, GET_POSTS, POST_LOADING } from '../actions/types';
const initialState = {
  post: {},
  posts: [],
  loading: false
}

const postReducer = function(state=initialState, actions){
  switch(actions.type){
    default : return state 
    case GET_POSTS:
    return {
      posts: actions.payload,
      loading: false
    }
    case POST_LOADING:
    return {
      loading: true
    }
    case GET_POST:
    return {
      ...state,
      post: actions.payload,
      loading: false
    }
  }
}
export default postReducer;
