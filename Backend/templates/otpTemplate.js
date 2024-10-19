const otpTemplate = (otp) => {
    return `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2>Hey there,</h2>
        <p>Your One-Time Password (OTP) for email verification is:</p>
        <h3 style="color: #4CAF50;">${otp}</h3>
        <p>This OTP is valid for the next 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <br>
        <p>Best regards,</p>
      </div>
    `;
  };
  
  module.exports = otpTemplate;
  