const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  avatar:{
    type:String
  },
  password:{
    type:String,
    require:true
  }
});
module.exports = mongoose.model('User', UserSchema);