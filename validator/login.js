const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(input){
  let errors={};
 
  input.email =!isEmpty(input.email)?input.email:'';
  input.password =!isEmpty(input.password)?input.password:'';

  if(!validator.isEmail(input.email)){
    errors.email = 'invalid email';
  } 
  if(!validator.isLength(input.password, {min:4, max:30})){
    errors.password = 'password must be b/w 4 to 30 charactors';
  }
  if(validator.isEmpty(input.email)){
    errors.email = 'email required';
  } 
  if(validator.isEmpty(input.password)){
    errors.password = 'password required';
  }
  return {
    errors,
    isValid:isEmpty(errors)
  };
}
