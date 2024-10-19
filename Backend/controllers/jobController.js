const Job = require('../models/Job');
const nodemailer = require('nodemailer');

// Create job
const createJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidates } = req.body;

  const job = await Job.create({
    title,
    description,
    experienceLevel,
    endDate,
    candidates,
    company: req.company._id,
  });

  if (job) {
    sendJobEmails(job, candidates);
    res.status(201).json(job);
  } else {
    res.status(400).json({ message: 'Invalid job data' });
  }
};

// Send job emails
const sendJobEmails = (job, candidates) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  candidates.forEach((candidate) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: candidate.email,
      subject: `New Job Opportunity: ${job.title}`,
      text: `Job Details:\nTitle: ${job.title}\nDescription: ${job.description}\nApply by: ${job.endDate}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else console.log('Email sent to: ' + candidate.email);
    });
  });
};

module.exports = { createJob };
