const router = require('express').Router();
const { getAllUsers } = require('../controller/userController');
const authentication = require('../middleware/authentication');
const restrictTo = require('../middleware/restrictTo');

router.route('/').get(authentication, restrictTo('0'), getAllUsers)

module.exports = router;   