const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
// require router
const users = require('./routes/users');
const profile = require('./routes/profile');
const post = require('./routes/post');

// impliment jwt_authentication
require('./config/passport')(passport);

// initialize const
const app = express();
const keys = require('./config/keys');
// connect to db
mongoose.connect(keys.mongoURI, {useNewUrlParser:true})
.then( () => console.log('connect to db...'))
.catch(err => console.log(err))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// use routes
app.use('/api/users',users);
app.use('/api/profile', profile);
app.use('/api/post', post);

// set static file if production
app.use(express.static(path.join(__dirname, 'client/build')));
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}

// listen server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listen at ${port}`));
