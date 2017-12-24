const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const promisify = require('es6-promisify');
const fs = require('fs');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    // if the file isnt an image reject it
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

exports.upload = multer(multerOptions).single('image');

exports.saveFile = async (req, res, next) => {
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  // setup file name
  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `${uuid.v4()}.${extension}`;

  const image = await jimp.read(req.file.buffer);
  // save file to uploads folder
  await image.write(`./public/uploads/${req.body.image}`);
  next();
};

exports.createTweet = async (req, res) => {
  // set author of tweet to user
  req.body.author = req.user._id;
  // save tweet
  const tweet = await new Tweet(req.body).save();
  console.log(tweet);

  // find author
  const author = await User.findById(tweet.author);
  // add tweet to authors tweets
  author.tweets.unshift(tweet._id);
  await author.save();

  // redirect user with saved message
  req.flash('success', `Tweet Saved`);
  res.redirect('back');
};

exports.deleteTweet = async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);

  // make sure user owns tweet
  if (tweet.author.equals(req.user._id)) {
    // find user
    const user = await User.findById(req.user._id);
    // remove tweet from users tweet list
    await user.tweets.pull(tweet._id);
    // if there is a image attached to tweet delete it from server
    if (tweet.image) {
      await fs.unlink(`./public/uploads/${tweet.image}`);
    }
    // delete tweet
    await tweet.remove();
    // save user
    await user.save();
    // send user back with success message to notify tweet was deleted
    req.flash('success', 'Tweet removed!');
    res.redirect('back');
  } else {
    req.flash('error', 'You do not have permission to do that!');
    res.redirect('back');
  }
};

exports.likeTweet = async (req, res) => {
  // turn Id Objects into strings for searching
  const likes = req.user.likes.map(obj => obj.toString());

  // if target is in users likes
  const userHasLiked = likes.includes(req.params.id);

  // find user and add target to likes list
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { [userHasLiked ? '$pull' : '$addToSet']: { likes: req.params.id } },
    { new: true }
  );

  await Tweet.findByIdAndUpdate(
    { _id: req.params.id },
    { $inc: { likes: userHasLiked ? -1 : 1 } }
  );

  res.json(user);
};
