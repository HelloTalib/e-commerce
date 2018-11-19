const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email:{
    type: String,
    required:true,
    trim: true,
    unique:1
  },
  password:{
    type:String,
    required:true,
    minlength: 5
  },
  firstName:{
    type:String,
    required:true,
    maxlength:15
  },
  
  lastName:{
    type:String,
    required:true,
    maxlength:15
  },
  cart:{
    type:Array,
    default:[]
  },
  history:{
    type:Array,
    default:[]
  },
  role:{
    type:Number,
    defalut:0
  },
  token:{
    type:String
  }

});




userSchema.pre('save', (nex) => {
  let user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  }
})

userSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if(err) return cb(err);
      callback(null, isMatch)
    })
}

  
module.exports = mongoose.model('User', userSchema);