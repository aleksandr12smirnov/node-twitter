const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tweetSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  },
  body: {
    type: String,
    maxlength: 280,
    required: 'You must add text to your tweet'
  },
  created: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  retweets: {
    type: Number,
    default: 0
  },
  image: String,
  replies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet'
    }
  ],
  replyTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet'
  }
});

module.exports = mongoose.model('Tweet', tweetSchema);
