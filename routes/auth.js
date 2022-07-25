const router = require('express').Router();
const authController = require('./../controllers/auth');
//SIGNUP
router.post('/sign', authController.post_signup);
//LOGIN
router.post('/login', authController.post_login);
//Get Sign
router.get('/sign', authController.get_signup);
//Get Login
router.get('/login', authController.get_login);

module.exports = router;