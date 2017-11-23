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
  likes: Number,
  retweets: Number,
  replies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet'
    }
  ]
});

module.exports = mongoose.model('Tweet', tweetSchema);
