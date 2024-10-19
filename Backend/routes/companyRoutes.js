const express = require('express');
const { registerCompany, loginCompany, verifyOTP } = require('../controllers/companyController');
const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.post('/verify-otp', verifyOTP); 

module.exports = router;
