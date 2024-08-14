const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

router.get('/charity',charityController.getAllCharity);
router.get('/deactivate-charity/:id',charityController.deactivateCharity)
router.get('/activate-charity/:id',charityController.activateCharity)


router.get('/settings', (req, res) => {
    res.render('admin/settings', { title: 'Settings' });
});

module.exports = router;