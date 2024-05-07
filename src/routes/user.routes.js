const express = require('express');
const router = express.Router();
const { testUser, register, login } = require('../controllers/user.controllers');
const { auth } = require('../middlewares/auth');

router.get('/user', testUser);

router.post('/register', register);

router.post('/login',auth, login)

module.exports = router;