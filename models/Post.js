const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  name:{
    type: String,
  },
  avatar:{
    type: String
  },
  text:{
    type:String
  },
  likes:[{
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
    },
    date:{
      type:Date,
      default:Date.now
    }
  }],
  comment:[{
    user:{
      type:Schema.Types.ObjectId,
      ref:'users',
    },
    name:{
      type:String
    },
    avatar:{
      type:String
    },
    text:{
      type:String,
      require:true
    },
    date:{
      type:Date,
      default:Date.now
    }
  }],
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('post', PostSchema);