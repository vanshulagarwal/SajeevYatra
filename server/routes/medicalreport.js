const express = require('express');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { uploadReport } = require('../controllers/medicalreport');
const router = express.Router();

router.route('/uploadreport').post(catchAsync(isLoggedIn), catchAsync(uploadReport));

module.exports = router;