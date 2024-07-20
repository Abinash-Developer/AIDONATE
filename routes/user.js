const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/sign_up',userController.userRegister);
router.post('/sign_in',userController.userSignIn);

module.exports = router;