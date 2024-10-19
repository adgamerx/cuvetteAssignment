const Job = require('../models/Job');
const nodemailer = require('nodemailer');

// Create job
const createJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidates } = req.body;

  try {
    // Ensure that candidates are passed as objects with an email field
    const job = await Job.create({
      title,
      description,
      experienceLevel,
      endDate,
      candidates: candidates.map(email => ({ email })),  // Convert emails to objects
      company: req.company._id,
    });

    // After successfully creating the job, send email notifications to candidates
    if (job) {
      // Send email, but map to include candidate emails as objects
      sendJobEmails(job, candidates.map(email => ({ email })));
      return res.status(201).json(job);
    } else {
      return res.status(400).json({ message: 'Invalid job data' });
    }
  } catch (error) {
    // Handle error gracefully
    return res.status(500).json({ message: error.message });
  }
};

// Send job emails to candidates
const sendJobEmails = (job, candidates) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASS,
    },
  });

  // Ensure we're sending emails only if candidates exist
  if (Array.isArray(candidates) && candidates.length > 0) {
    candidates.forEach((candidate) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: candidate.email,  // Access email field from candidate object
        subject: `New Job Opportunity: ${job.title}`,
        text: `Job Details:\nTitle: ${job.title}\nDescription: ${job.description}\nApply by: ${job.endDate.toDateString()}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email to:', candidate.email, error.message);
        } else {
          console.log('Email sent to:', candidate.email);
        }
      });
    });
  } else {
    console.log('No candidates provided for email notifications.');
  }
};

module.exports = { createJob };
