const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/auth');

// Import controllers
const save = require('../controllers/publication/save.controllers');
const detail = require('../controllers/publication/datail.controllers'); // Correct typo in file name
const remove = require('../controllers/publication/remove.controllers');
const listUser = require('../controllers/publication/listUser.controllers');
const listAll = require('../controllers/publication/listAll.controllers');
const updatePublication = require('../controllers/publication/update.controllers');
const searchPublications = require('../controllers/publication/search.controllers');

// Publication routes
router.post('/save', checkToken, save); // Save a new publication
router.get('/detail/:id', checkToken, detail); // Get publication details
router.delete('/remove/:id', checkToken, remove); // Remove a publication
router.get('/user/:id/:page?', checkToken, listUser); // List user's publications
router.get('/all/:page?', checkToken, listAll); // List all publications
router.put('/update/:id', checkToken, updatePublication); // Update a publication
router.get('/search', checkToken, searchPublications); // Search publications

module.exports = router;
