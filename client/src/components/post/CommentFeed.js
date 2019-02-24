import React, { Component } from 'react'
import CommentItem from './CommentItem';
class CommentFeed extends Component {
  render() {
    const { comment, user, post_id } = this.props;
    return comment.map(item => <CommentItem key={item._id} comment={item} user={user} postId={post_id}/> );   
  }
}
export default CommentFeed;