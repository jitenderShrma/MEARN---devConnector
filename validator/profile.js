const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(input){
  let errors={};
  input.handle =!isEmpty(input.handle)?input.handle:'';
  input.status =!isEmpty(input.status)?input.status:'';
  input.skills =!isEmpty(input.skills)?input.skills:'';

  if(!validator.isLength(input.handle,{ min:2, max: 10 })){
    errors.handle = 'handle must be between 2 to 30 charactor';
  }
  if(validator.isEmpty(input.handle)){
    errors.handle = 'handle required';
  }
  if(validator.isEmpty(input.status)){
    errors.status = 'status required';
  }
  if(validator.isEmpty(input.skills)){
    errors.skills = 'skills required';
  }
  if(!isEmpty(input.company)){
    if(!validator.isLength(input.company, { min:2, max:30 })){
      errors.company = 'company name must be between 2 to 30 charactors';
    }
  }
  if(!isEmpty(input.website)){
    if(!validator.isURL(input.website)){
      errors.website = 'invalid url';
    }
  }
  if(!isEmpty(input.location)){
    if(!validator.isLength(input.location, { min:2, max:30 })){
      errors.location = 'location must be between 2 to 30 charactors';
    }
  }
  if(!isEmpty(input.githubUsername)){
    if(!validator.isURL(input.githubUsername)){
      errors.githubUsername = 'invalid url';
    }
  }
  if(!isEmpty(input.bio)){
    if(!validator.isLength(input.bio, { min:10, max:300 })){
      errors.bio = 'bio must be between 2 to 300 charactors';
    }
  }
  //socials ------------------------------------------
  if(!isEmpty(input.youtube)){
    if(!validator.isURL(input.youtube)){
      errors.youtube = 'invalid url';
    }
  }
  if(!isEmpty(input.facebook)){
    if(!validator.isURL(input.facebook)){
      errors.facebook = 'invalid url';
    }
  }
  if(!isEmpty(input.linkedin)){
    if(!validator.isURL(input.linkedin)){
      errors.linkedin = 'invalid url';
    }
  }
  if(!isEmpty(input.instagram)){
    if(!validator.isURL(input.instagram)){
      errors.instagram = 'invalid url';
    }
  }
  if(!isEmpty(input.twitter)){
    if(!validator.isURL(input.twitter)){
      errors.twitter = 'invalid url';
    }
  }
  return {
    errors,
    isValid:isEmpty(errors)
  };
}
