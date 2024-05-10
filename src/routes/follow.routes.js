const check = require('../middlewares/auth');


const {saveFollow} = require('../controllers/follow/saveFollow.controllers');
const express = require('express');

const router = express.Router();


router.post('/save', check.auth, saveFollow);

module.exports = router;