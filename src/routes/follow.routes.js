const check = require('../middlewares/auth');


const { saveFollow } = require('../controllers/follow/saveFollow.controllers');
const { unfollow } = require('../controllers/follow/deleteFollow.controllers'); 
const { following } = require('../controllers/follow/followingFollow.controllers');
const { followed } = require('../controllers/follow/followersFollow.controllers');

const express = require('express');

const router = express.Router();


router.post('/save', check.auth, saveFollow);
router.delete('/unfollow/:id', check.auth, unfollow);
router.get('/following/:id?/:page?', check.auth, following);
router.get('/followed/:id?/:page?', check.auth, followed);
module.exports = router;