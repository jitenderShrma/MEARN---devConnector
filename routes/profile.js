const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../models/Profile');
const User = require('../models/User');
const validateProfileInput = require('../validator/profile');
const validateExperienceInput = require('../validator/experience');
const validateEducationInput = require('../validator/education');

// @router POST(/api/profile/)
// @router status private
// @router desc create profile

router.post('/create', passport.authenticate('jwt', {session: false}),(req,res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  if(!isValid){
    return res.status(404).json(errors);
  } else {
    // profileFields
    const skills = req.body.skills.split(',');
    const profileFields = {};

    profileFields.handle = req.body.handle;
    profileFields.status = req.body.status;
    profileFields.skills = skills;
    profileFields.user = req.user.id;
    if(req.body.company) profileFields.company=req.body.company;
    if(req.body.website) profileFields.website=req.body.website;
    if(req.body.location) profileFields.location=req.body.location;
    if(req.body.githubUsername) profileFields.githubUsername=req.body.githubUsername;
    if(req.body.bio) profileFields.bio=req.body.bio;
    // socials
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    // check user already exist or not
    Profile.findOne({user:req.user.id})
      .then(profile => {
        if(profile){
          // update profile
           // save into db to update profile
           Profile.findOneAndUpdate(
            { user:req.user.id },
            { $set:profileFields },
            {new: true}
          )
          .then(profile => res.json(profile));
        } else {
           //create profile but handle check if it's exist
           Profile.findOne({handle:profileFields.handle})
            .then(profile => {
              if(profile){
                errors.handle = 'that handle already exist';
                res.status(400).json(errors);
              } else {
                // save to new profile
                new Profile(profileFields).save()
                .then(profile => {
                res.status(200).json(profile);
                })
                .catch(error => res.status(202).json(error));
              }
            })
        }
      });
  }
});

// @router POST(/api/profile/experience)
// @router status private
// @router desc add experience

router.post('/experience', passport.authenticate('jwt', {session: false}),(req,res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  if(!isValid){
    return res.status(404).json(errors);
  } else {
    // experience fields
    const addExp = {};
    addExp.title = req.body.title;
    if(req.body.company) addExp.company = req.body.company;
    if(req.body.location) addExp.location = req.body.location;
    if(req.body.from) addExp.from = req.body.from;
    if(req.body.to) addExp.to = req.body.to;
    if(req.body.description) addExp.description = req.body.description;
    if(req.body.current) addExp.current = req.body.current;
    // find user by id
    Profile.findOne({user:req.user.id})
    .then(profile => {
    profile.experience.unshift(addExp);
    profile.save()
    .then(() => res.json({success:true}))
    .catch(errors =>res.status(400).json(errors))
    });
  };
});

// @router POST(/api/profile/education)
// @router status private
// @router desc add education

router.post('/education', passport.authenticate('jwt', {session: false}),(req,res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  if(!isValid){
    return res.status(404).json(errors);
  } else {
    // education fields
    const addEdu = {};
    addEdu.degree = req.body.degree;
    if(req.body.school) addEdu.school = req.body.school;
    if(req.body.fieldOfStudy) addEdu.fieldOfStudy = req.body.fieldOfStudy;
    if(req.body.from) addEdu.from = req.body.from;
    if(req.body.to) addEdu.to = req.body.to;
    if(req.body.description) addEdu.description = req.body.description;
    if(req.body.current) addEdu.current = req.body.current;
    // find user by id
    Profile.findOne({user:req.user.id})
    .then(profile => {
    profile.education.unshift(addEdu);
    profile.save().then(profile => res.json(profile)).catch(err =>res.status(404).json(err));
    });
  };
});

// @router delete(/api/profile/:_id)
// @router status private
// @router desc delete profile

router.delete('/profile/:_id', passport.authenticate('jwt', {session: false}),(req,res) => {
  Profile.findOne({user:req.user.id})
   .then(profile => {
    if(profile == null || undefined){
      res.json({profile:'not authorize user'});
    } else {
      Profile.remove({_id:req.params._id})
      .then(() => res.json({profile:'delete successfuly'}))
      .catch(err => res.status(404).json({error:err}));
    }
   })
   .catch(err => res.json({error:err}));
});


// @router DELETE(/api/profile/education/:p_id/:edu_id)
// @router status private
// @router desc delete education

router.delete('/education/:_id', passport.authenticate('jwt', {session: false}),(req,res) => {
  Profile.findOne({user:req.user.id})
    .then(profile => {
      // remove index
      const removeIndex = profile.education.map(item => item._id).indexOf(req.params.edu_id);
      profile.education.splice(removeIndex, 1);
      profile.save()
       .then(profile => res.json(profile));
    });
});

// @router DELETE(/api/profile/experience/:p_id/:exp_id)
// @router status private
// @router desc delete experience

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}),(req,res) => {
      Profile.findOne({user:req.user.id})
      .then(profile => {
      // remove index
      const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);
      profile.experience.splice(removeIndex, 1);
      profile.save()
       .then(profile => res.json(profile));
    });
});

//----------------------------------------------------------
// get requests for find of profile by all posible types.


// @router get(/api/profile)
// @router status public
// @router desc find all profile
router.get('/all', (req,res) => {
  const errors={};
  Profile.find()
   .then(profile => {
     if(!profile){
       errors.profile = 'no profile found';
       res.status(200).json(profile);
     } else {
       res.json(profile);
     }
   })
   .catch(error => res.status(404).json(error));
});

// @router get(/api/profile/handle/:handle)
// @router status public
// @router desc profile by handle
router.get('/handle/:handle', (req,res) => {
  Profile.findOne({handle:req.params.handle})
   .then(profile => {
     if(!profile){
      profile.noprofile='no profile with this handle';
       res.status(200).json(profile);
     } else {
       res.json(profile);
     }
   })
   .catch(error => res.status(404).json(error));
});

// @router get(/api/profile/:_id)
// @router status private
// @router desc profile by profile_id

router.get('/user_id/:user_id', passport.authenticate('jwt', {session : false}), (req,res) => {
  const errors = {};
  Profile.findOne({user:req.params.user_id})
   .then(profile => {
     if(!profile){
       errors.noprofile = 'no profile with this user';
       res.status(404).json(errors);
     } else {
       res.json(profile);
     }
   })
   .catch(error => res.status(404).json(error));
});
// @route   GET api/profile/getCurrentProfile
// @desc    Get current users profile
// @access  Private
router.get(
  '/getCurrentProfile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  })
  // @route   GET api/profile/
// @desc    delete profile
// @access  Private
router.delete('/delete', passport.authenticate('jwt', {session:false}) ,(req, res) => {
  User.findOneAndRemove({_id: req.user.id})
    .then(() => {
      Profile.findOneAndRemove({user: req.user.id})
      .then(() => res.json({success:true}))
    })
    .catch(error => res.json(error));
});

module.exports = router;