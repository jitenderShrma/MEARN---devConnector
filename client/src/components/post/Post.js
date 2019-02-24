import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { getPost } from '../../actions/postAction';
class Post extends Component {
  componentDidMount(){
    this.props.getPost(this.props.match.params.p_id);
  }
  render() {
    const { loading, post} = this.props.post;
    const { user } = this.props.auth;
    let postContent;
    if(post === undefined || loading ){
      postContent = <Spinner/>
    } else {
      postContent = (
        <div>
          <PostItem post={post} showCase={false}/>
          <CommentForm post_id= {this.props.match.params.p_id}/>
          <CommentFeed comment={post.comment} user={user} post_id ={post._id}/>
        </div>
      );
    }
    return (
      <div className='Post'>
        <div className="container">
          <div className="row">
            <Link to='/feed' className="btn btn-light mb-4">Go back feed</Link>
            <div className="col-md-12">
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Post.proptypes = {
  getPost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});
export default connect(mapStateToProps, {getPost}) (Post);