const express = require('express');
const app = express();
const router = express.Router();
const charityController = require('../controllers/charityController');
const categoryController = require('../controllers/categoryController');
const loginController =  require('../controllers/loginController');
const authController = require('../controllers/authController');
const checkUser = require('../middleware/validUser');
const upload = require('../utils/upload');
router.get('/login',loginController.login);
router.get('/logout',authController.logout);
router.get('/dashboard',checkUser,(req, res) => {
    res.render('admin/dashboard',{ currentRoute: 'dashboard' });
});

router.get('/charity',charityController.getAllCharity);
router.get('/deactivate-charity/:id',charityController.deactivateCharity);
router.get('/activate-charity/:id',charityController.activateCharity);


// category section
router.get('/categories',categoryController.fetchCategory);
router.get('/categories/:id',categoryController.getCategoryById);
router.get('/categories/edit/:id',categoryController.getCategoryByIdEdit);
router.post('/categories/update/',upload.singleFileUpload('image'),categoryController.updateCategory);

router.get('/settings', (req, res) => {
    res.render('admin/settings', { title: 'Settings' });
});

module.exports = router;