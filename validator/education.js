const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateEducationInput(input){
  let errors={};
  input.degree =!isEmpty(input.degree)?input.degree:'';
  input.school =!isEmpty(input.school)?input.school:'';
  input.fieldOfStudy =!isEmpty(input.fieldOfStudy)?input.fieldOfStudy:'';
  input.from =!isEmpty(input.from)?input.from:'';
  input.to =!isEmpty(input.to)?input.to:'';
  input.description =!isEmpty(input.description)?input.description:'';

  if(validator.isEmpty(input.degree)){
    errors.degree = 'degree required';
  } 
  if(validator.isEmpty(input.from)){
    errors.from = 'from required';
  }
  if(!isEmpty(input.description)){
    if(!validator.isLength(input.description, { min:10, max:300 })){
      errors.description = 'description must be between 10 to 300 caractors'
    }
  }
  return {
    errors,
    isValid:isEmpty(errors)
  };
}
