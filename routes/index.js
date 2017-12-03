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

router.get('/', appController.index);

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
router.get('/:handle', userController.userPage);

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
