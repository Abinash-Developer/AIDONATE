const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
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
router.get('/get_user_detail',authMiddleware.verifyToken,userController.getUserDetail);

// Wishlist Route
router.get('/add-to-wishlist/:id',authMiddleware.verifyToken,userController.addToWishlist);
router.get('/fetch-wishlist-explore/',authMiddleware.verifyToken,userController.fetchWishlistByUser);
router.get('/fetch-wishlist-ByID/:id',authMiddleware.verifyToken,userController.fetchWishlistByID);
router.get('/fetch-wishlist-ByIndividualUser/',authMiddleware.verifyToken,userController.fetchWishlistByIndividualUser);
router.get('/remove-wishlist/:id',authMiddleware.verifyToken,userController.removeWishlist);
 
//Usre account API
router.get('/get-donation-history/:id',authMiddleware.verifyToken,userController.getDonationHistory);

// Razorpay API code 

router.post('/create-order',paymentController.createOrder);
router.post('/save-paymet-details',paymentController.savePaymentDetail);

module.exports = router;