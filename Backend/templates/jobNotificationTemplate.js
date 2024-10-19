const jobNotificationTemplate = (job) => {
    return `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2>Hi,</h2>
        <p>We are excited to inform you about a new job opportunity that matches your profile:</p>
        <h3 style="color: #4CAF50;">${job.title}</h3>
        <p>${job.description}</p>
        <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
        <p><strong>Apply by:</strong> ${job.endDate}</p>
        <p>If you are interested, apply now through our platform!</p>
        <br>
        <p>Best regards,</p>
      </div>
    `;
  };
  
  module.exports = jobNotificationTemplate;
  