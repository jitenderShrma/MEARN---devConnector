const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateExperienceInput(input){
  let errors={};
  input.title =!isEmpty(input.title)?input.title:'';
  input.company =!isEmpty(input.company)?input.company:'';
  input.location =!isEmpty(input.location)?input.location:'';
  input.from =!isEmpty(input.from)?input.from:'';
  input.to =!isEmpty(input.to)?input.to:'';
  input.description =!isEmpty(input.description)?input.description:'';

  if(validator.isEmpty(input.title)){
    errors.title = 'title required';
  } 
  if(validator.isEmpty(input.from)){
    errors.from = 'from required';
  }
  if(!isEmpty(input.description)){
    if(!validator.isLength(input.description, {min:10, max:300})){
      errors.description = 'description must be between 10 to 300 caractors'
    }
  }
  return {
    errors,
    isValid:isEmpty(errors)
  };
}
