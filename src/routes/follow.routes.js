const express = require('express');
const router = express.Router();
const check = require('../middlewares/auth');

// Import controllers
const { saveFollow } = require('../controllers/follow/saveFollow.controllers');
const { unfollow } = require('../controllers/follow/deleteFollow.controllers');
const { following } = require('../controllers/follow/followingFollow.controllers');
const { followers } = require('../controllers/follow/followersFollow.controllers');

// Follow routes
router.post('/save', check.auth, saveFollow); // Save a follow
router.delete('/unfollow/:id', check.auth, unfollow); // Unfollow a user
router.get('/following/:id?/:page?', check.auth, following); // Get following users with pagination
router.get('/followers/:id?/:page?', check.auth, followers); // Get followers with pagination

module.exports = router;
