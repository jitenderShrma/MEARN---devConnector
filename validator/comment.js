const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateCommentInput(input){
  let errors={};
  
  input.text =!isEmpty(input.text)?input.text:'';

  if(!validator.isLength(input.text, {min:10, max:300})){
    errors.text = 'text must be b/w 10 to 300 charactors';
  }
  if(validator.isEmpty(input.text)){
    errors.text = 'text field required';
  }   
  return {
    errors,
    isValid:isEmpty(errors)
  };
}
