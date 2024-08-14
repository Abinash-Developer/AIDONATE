const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "965b1051056889",
      pass: "8f4298e3c40a2e"
    }
  });

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Email Verification',
        text: `Your OTP is ${otp}`
    };

    await transport.sendMail(mailOptions);
};

module.exports = { sendOTP };
