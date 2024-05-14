const express = require('express');

const router = express.Router();

const save = require('../controllers/publication/save.controllers');
const checkToken = require('../middlewares/auth');

router.post('/save',checkToken, save);