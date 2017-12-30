const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');

/*
    Index Route
*/

router.get('/', appController.index, appController.homePage);

/*
    Auth Routes (Login Logout Register)
*/

router.get('/login', userController.loginForm);
router.post('/login', authController.usernameToLowerCase, authController.login);
router.get('/register', userController.registerForm);
router.post(
  '/register',
  userController.validateRegister,
  authController.usernameToLowerCase,
  catchErrors(userController.register),
  authController.login
);
router.get('/logout', authController.isLoggedIn, authController.logout);

/* 
  User Routes
*/

router.get('/:handle', catchErrors(userController.showUserTweets));
router.get('/:handle/following', catchErrors(userController.showUserFollowing));
router.get('/:handle/followers', catchErrors(userController.showUserFollowers));
router.get('/:handle/likes', catchErrors(userController.showUserLikes));

/* 
  Tweet Routes
*/

router.post(
  '/tweet/new',
  authController.isLoggedIn,
  tweetController.upload,
  catchErrors(tweetController.saveFile),
  catchErrors(tweetController.createTweet)
);

router.delete(
  '/tweet/:id',
  authController.isLoggedIn,
  catchErrors(tweetController.deleteTweet)
);

module.exports = router;

/*
  Api Routes
*/

router.post(
  '/api/user/:id/follow',
  authController.isLoggedIn,
  userController.followUser
);

router.post(
  '/api/tweet/:id/like',
  authController.isLoggedIn,
  tweetController.likeTweet
);

router.get('/api/test', appController.testRoute);
