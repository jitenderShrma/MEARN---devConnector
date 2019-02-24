import React, { Component } from 'react'
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';
import { getAllPosts } from '../../actions/postAction.js';

class Post extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if(posts === undefined || posts === null || loading){
      postContent=<Spinner/>
    } else {
      postContent = postContent = <PostFeed posts={posts}/>
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Post.proptypes = {
  post:PropTypes.array.isRequired
}
const mapStateToProps= state => ({
  post:state.post
})
export default  connect(mapStateToProps,{getAllPosts}) (Post);