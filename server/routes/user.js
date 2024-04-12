const express = require('express');
const catchAsync = require('../utils/catchAsync');
const { register, login, logout, dashboarddata } = require('../controllers/user');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const router = express.Router();

router.route('/register').post(catchAsync(register));
router.route('/login').post(catchAsync(login));
router.route('/logout').get(catchAsync(logout));
router.route('/dashboarddata').get(catchAsync(isLoggedIn), catchAsync(dashboarddata));

module.exports = router;