const express = require('express');
const router = express.Router();
const {testUser} = require('../controllers/user.controllers');

router.get('/user', testUser);

module.exports = router;