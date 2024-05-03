const express = require('express');
const router = express.Router();
const {testUser, register} = require('../controllers/user.controllers');

router.get('/user', testUser);

router.post ('/register', register);

module.exports = router;