const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateRegisterInput = require('../validator/register');
const validateLoginInput = require('../validator/login');
const passport = require('passport');

// @router /api/user/register
// @router status public
// @router desc register user

router.post('/register', (req,res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  // errors checking
  if(!isValid) {
    return res.status(404).json(errors);
  } else {
    const avatar = gravatar.url( req.body.email, {s: '200', r: 'pg', d: '404'});
    const newUser = {
      name:req.body.name,
      avatar:avatar,
      email:req.body.email,
      password:req.body.password
    }
    // gen salt
    bcrypt.genSalt(10, (err,salt) => {
      // hash to password
      bcrypt.hash(newUser.password, salt, (err,hash) => {
        newUser.password = hash;
        // save to db
        User(newUser).save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(error => {
          res.status(404).json(error);
        });  
      });
    });
  } 
});

// @router /api/user/login
// @router status public
// @router desc login user

router.post('/login', (req,res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // error check
  if(!isValid){
    res.status(404).json(errors);
  } else {
  const loginUser = {
    email:req.body.email,
    password:req.body.password
  }
  // check user exist or not
  User.findOne({email:loginUser.email})
  .then(user => {
    if(user===null || undefined){
      errors.email = 'user not found';
      return res.status(404).json(errors);
    } else{
      bcrypt.compare(loginUser.password, user.password, (err,isMatch) =>{
         if(!isMatch){
           errors.password = 'Incurrect password';
           return res.status(404).json(errors);
         } else {
           // password match
           if(isMatch){
             // send token
             payload={
               id:user.id,                    
               name:user.name,
               email:user.email,
               avatar:user.avatar,
               password:user.password
             }
             // create token
             jwt.sign(
               payload,
               'secret',
               {expiresIn:'1h'},
               (err,token) => {
                 if(err) throw err;
                 token = "Bearer " + token;
                 res.json({success:true, token});
               });
           }
         }
      });
    }
  })
  .catch(error => {
    res.status(404).json(error);
  });
  }
});

router.post('/test',passport.authenticate('jwt',{session:false}) ,(req,res) => {
  
  res.send(req.user);
});

module.exports = router;