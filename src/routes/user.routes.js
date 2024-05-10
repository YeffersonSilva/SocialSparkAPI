const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

// Import controllers
const { register } = require('../controllers/user/register.controllers');
const { login } = require('../controllers/user/login.controllers');
const { profile } = require('../controllers/user/profile.controllers');
const { list } = require('../controllers/user/list.controllers');
const { update } = require('../controllers/user/update.controllers');
const { upload } = require('../controllers/user/upload.controllers');
const {avatar} = require('../controllers/user/avatar.controllers');

const check = require('../middlewares/auth');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads', 'avatars');
        if (!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = "avatar-" + new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname;
        cb(null, fileName);
    }
});

const uploads = multer({ storage: storage });

// User routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', check.auth, profile);
router.get('/list/:page?', list);
router.put('/update', check.auth, update);
router.post('/upload', [check.auth, uploads.single("file0")], upload);
router.get('/avatar/:file', avatar);

module.exports = router;
