const express = require('express');
const router = express.Router();

const userController = require('./userController');

router.post('/signup', userController.signUpWithDetails)
router.post('/signin', userController.signInWithEmailAndPass)

module.exports = router;