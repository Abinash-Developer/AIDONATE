const express = require('express');
const router = express.Router();
const commonController = require('../controllers/commonController');

router.get('/state',commonController.getState);
router.get('/city/:id',commonController.getCity);
router.post('/checkemail',commonController.checkEmail);
router.post('/verify-otp',commonController.verifyOtp);
router.post('/change-password',commonController.changePassword);

module.exports = router;