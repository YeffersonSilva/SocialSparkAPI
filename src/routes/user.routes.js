const express = require('express');
const router = express.Router();
const {testUser, register,login} = require('../controllers/user.controllers');

router.get('/user', testUser);

router.post('/register', register);

router.post('/login', login)

module.exports = router;