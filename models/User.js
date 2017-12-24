const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: 'You must supply a Username!'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'You must supply a Email Address!'
  },
  name: {
    type: String,
    required: 'You must supply a name!'
  },
  handle: {
    type: String,
    required: 'You must supply a handle!'
  },
  bio: String,
  tweets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet'
    }
  ],
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet'
    }
  ],
  joined: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(deepPopulate);

module.exports = mongoose.model('User', userSchema);
