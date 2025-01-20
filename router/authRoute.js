const router = require('express').Router();
const { singup, login } = require('../controller/authController');

router.route('/signup').post(singup);
router.route('/login').post(login);

module.exports = router;   