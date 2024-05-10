const check = require('../middlewares/auth');


const { saveFollow } = require('../controllers/follow/saveFollow.controllers');
const { unfollow } = require('../controllers/follow/deleteFollow.controllers'); 

const express = require('express');

const router = express.Router();


router.post('/save', check.auth, saveFollow);
router.delete('/unfollow/:id', check.auth, unfollow);

module.exports = router;