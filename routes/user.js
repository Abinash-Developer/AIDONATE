const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');
// var upload = multer();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/ngo_register', upload.any(),userController.ngoRegister);
router.post('/sign_up',userController.userRegister);
router.post('/sign_in',userController.userSignIn);

module.exports = router;