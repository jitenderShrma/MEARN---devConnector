import axios from 'axios';
import { GET_POST,
  GET_POSTS, CLEAR_ERROR,
  GET_ERRORS, POST_LOADING } from './types';

// get all posts
export const getAllPosts = () => dispatch => {
  dispatch({type:POST_LOADING})
  axios.get('/api/post')
    .then(posts => dispatch({
      type: GET_POSTS,
      payload: posts.data
    }))
    .catch(error => dispatch({
      type: GET_POSTS,
      payload: {}
    }));
}
// delete post
export const deletePost = (post_id) => dispatch => {
  axios.delete(`/api/post/${post_id}`)
  .then(res => dispatch(getAllPosts()))
  .catch(err => dispatch(getErrors(err.response.data)));
};
// add like
export const addLike = (post_id) => dispatch => {
  axios
  .post(`/api/post/like/${post_id}`)
  .then(res => dispatch(getAllPosts()))
  .catch(err => dispatch(getErrors(err.response.data)));
}
// remove like
export const removeLike = (post_id) => dispatch => {
  axios
  .post(`/api/post/dislike/${post_id}`)
  .then(() => dispatch(getAllPosts(post_id)))
  .catch(err => dispatch(getErrors(err.response.data)));
}
// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearError())
  axios
    .post('/api/post', postData)
    .then(res => dispatch(getAllPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  dispatch({type:POST_LOADING});
  axios
    .get(`/api/post/${id}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch(err.response.data));
};
// Add comment
export const addComment = (p_id, commentData) => dispatch => {
  dispatch(clearError())
  axios
    .post(`/api/post/comment/${p_id}`, commentData)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch(getErrors(err.response.data)));
};
// Add comment
export const deleteComment = (post_id, comment_id) => dispatch => {
  axios
    .delete(`/api/post/${post_id}/${comment_id}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch(getErrors(err.response.data)));
};


export const clearError = () => {
  return {
    type:CLEAR_ERROR
  }
}
export const getErrors = (error) => {
  return{
    type: GET_ERRORS,
    payload: error
  }
}