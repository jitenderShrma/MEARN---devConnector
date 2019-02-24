const express = require('express');
const router = express.Router();
const passport = require('passport');

const Post = require('../models/Post');
const Profile = require('../models/Profile');
const validatePostInput = require('../validator/post');
const validateCommentInput = require('../validator/comment');

// @router POST(/api/post/)
// @router status private
// @router desc create post

router.post('/', passport.authenticate('jwt', {session: false}),(req,res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if(!isValid){
    return res.status(404).json(errors);
  } else {
    // post fields data
    const newPost = {
      user: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      text: req.body.text
    }
    Post(newPost).save()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => res.status(400).json(error));
  }
});

// @router POST(/api/post/comment/post_id)
// @router status private
// @router desc create comment

router.post('/comment/:post_id', passport.authenticate('jwt', {session: false}),(req,res) => {
  const { errors, isValid } = validateCommentInput(req.body);
  if(!isValid){
    return res.status(404).json(errors);
  } else {
    Post.findOne({_id: req.params.post_id})
      .then(post => {
      // comment fields data
      const newComment = {
      user: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      text: req.body.text
      }
      // pull out comment array and push into post
      post.comment.unshift(newComment);
      post.save()
        .then(post => res.json(post))
      })
  }
});

// @router POST(/api/post/like/post_id)
// @router status private
// @router desc to like a post

router.post('/like/:post_id', passport.authenticate('jwt',{session:false}), (req,res) => {
  Post.findById(req.params.post_id)
    .then(post => {
        if(
          post.likes.filter(like => like.user.toString() === req.user.id).length >0
        ) {
          res.status(400).json({alreadyLike:'you have already like to this post'})
        } else {
          // save to like
          post.likes.unshift({user: req.user.id});
          post.save().then(post => res.json(post));
        }
      
    })
    .catch(error => res.json(error));
});
// @router POST(/api/post/dislike/:id)
// @router status private
// @router desc to dislike a post

router.post('/dislike/:id', passport.authenticate('jwt',{session:false}), (req,res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: 'You have not yet liked this post' });
        }

        // Get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out of array
        post.likes.splice(removeIndex, 1);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
});

// @router get(/api/post/)
// @router status public
// @router desc to get all post

router.get('/', (req,res) => {
  Post.find()
    .sort({date: 'desc'})
    .then(post => {
      if(!post){
        res.json({noPostFound:'no post found'})
      } else {
        res.json(post)
      }
    });
});
// @router get(/api/post/:post_id)
// @router status public
// @router desc to get single post by id
router.get('/:post_id', (req,res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      if(!post){
        res.json({noPostFound:'no post found with this id'})
      } else {
        res.json(post)
      }
    });
});
// @router delete(/api/post/:post_id)
// @router status private
// @router desc to delete a post
router.delete('/:post_id', passport.authenticate('jwt', {session:false}),(req,res) => {
  Post.findOneAndRemove({_id:req.params.post_id})
    .then(() => {
      res.json({success:true});
    })
    .catch(error => res.json(error))
});
// @router delete(/api/post/:post_id/:comment_id)
// @router status private
// @router desc to delete a comment in a particular post
router.delete('/:post_id/:comment_id', passport.authenticate('jwt', {session:false}),(req,res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      const removeIndex = post.comment.map(item => item._id.toString()).indexOf(req.params.comment_id);
      post.comment.splice(removeIndex);
      post.save().then(post => res.json(post));
    })
});
module.exports = router;