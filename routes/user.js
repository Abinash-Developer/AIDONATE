const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');
const paymentController = require('../controllers/paymentController');
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
router.get('/get_ngo',userController.getNgo);

// Razorpay API code 

router.post('/create-order',paymentController.createOrder);
router.post('/register_user',paymentController.createUser);

module.exports = router;