const express = require('express');
const router = express.Router();
const { testUser, register, login, profile ,list,update} = require('../controllers/user.controllers');
const { auth } = require('../middlewares/auth');

router.get('/user', testUser);

router.post('/register', register);

router.post('/login', login)

router.get('/profile/:id', auth, profile); 

router.get('/list/:page?', list);

router.put('/update', auth, update);

module.exports = router;