const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

let opts={};
opts.secretOrKey ='secret';
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = passport => {
  passport.use(new jwtStrategy(
    opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
          .then(user => {
            if(user){
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch(err => {
            console.log(err)
          });
    }
  ))
}
