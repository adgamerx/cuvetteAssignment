const Company = require('../models/Company');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const otpTemplate = require('../templates/otpTemplate');
const { text } = require('express');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Helper function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper function to send OTP email
const sendOtpEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Activate you account',
    text: `use this number: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('OTP email sent: ' + info.response);
  });
};

// Register company and send OTP
const registerCompany = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  const companyExists = await Company.findOne({ email });
  if (companyExists) {
    return res.status(400).json({ message: 'Company already exists' });
  }

  const company = await Company.create({
    name,
    email,
    password,
    mobile,
  });

  if (company) {
    // Generate OTP and save it with expiration time (10 minutes)
    const otp = generateOTP();
    company.otp = otp;
    company.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await company.save();

    // Send OTP to the registered email
    sendOtpEmail(email, otp);

    res.status(201).json({
      _id: company._id,
      name: company.name,
      email: company.email,
      message: 'OTP sent to your email',
    });
  } else {
    res.status(400).json({ message: 'Invalid company data' });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const company = await Company.findOne({ email });

  if (!company) {
    return res.status(400).json({ message: 'Company not found' });
  }

  // Check if the OTP is valid
  if (company.otp === otp && company.otpExpires > Date.now()) {
    company.verified = true;
    company.otp = undefined;
    company.otpExpires = undefined;
    await company.save();

    res.status(200).json({ message: 'Account verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid or expired OTP' });
  }
};

// Login company
const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  const company = await Company.findOne({ email });

  if (company && (await bcrypt.compare(password, company.password))) {
    if (!company.verified) {
      return res.status(400).json({ message: 'Please verify your account first' });
    }
    res.json({
      _id: company._id,
      name: company.name,
      email: company.email,
      token: generateToken(company._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { registerCompany, loginCompany, verifyOTP };
