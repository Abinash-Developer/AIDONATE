const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');
const categoryController = require('../controllers/categoryController');
const loginController =  require('../controllers/loginController');
const upload = require('../utils/upload');
router.get('/login',loginController.login);
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
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