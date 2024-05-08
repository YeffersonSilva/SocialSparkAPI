const express = require('express');
const router = express.Router();

// Import individual controller modules
//const { testUser } = require('../controllers/user/testUser.controller');
const { register } = require('../controllers/user/register.controllers');
const { login } = require('../controllers/user/login.controllers');
const { profile } = require('../controllers/user/profile.controllers');
const { list } = require('../controllers/user/list.controllers');
const { update } = require('../controllers/user/update.controllers');
const { upload } = require('../controllers/user/upload.controllers');

const check = require('../middlewares/auth');

// User routes
//router.get('/user', testUser);

router.post('/register', register);

router.post('/login', login);

router.get('/profile/:id', check.auth, profile);

router.get('/list/:page?', list);

router.put('/update', check.auth, update);

router.post('/upload', check.auth, upload);

module.exports = router;
