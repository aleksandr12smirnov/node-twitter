const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

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
    catchErrors(userController.register),
    authController.usernameToLowerCase,
    authController.login
);
router.get('/logout', authController.logout);

module.exports = router;
