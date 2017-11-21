const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', appController.index);

router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.post(
    '/register',
    userController.validateRegister,
    catchErrors(userController.register),
    authController.login
);

module.exports = router;
