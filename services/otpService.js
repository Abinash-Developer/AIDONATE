const crypto = require('crypto');
const Otp = require('../models/otpModel');
const { sendOTP } = require('./emailService');

// const generateOTP = () => {
//     return crypto.randomBytes(3).toString('hex');
// };
const generateOTP = () => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  };
const createAndSendOTP = async (User) => {
    const email = User.email;
    const userId = User._id;
    const otp = generateOTP();
    const newOtp = new Otp({ email,otp,userId });
    await newOtp.save();
    await sendOTP(email, otp);
    return otp;
};

const verify_OTP = async (otp) => {
    const otpRecord = await Otp.findOne({otp});
    if (!otpRecord) {
        throw new Error('Invalid or expired OTP');
    }
    const deleteResult = await Otp.deleteOne({ _id: otpRecord._id });
    if (deleteResult.deletedCount !== 1) {
        throw new Error('Failed to delete OTP');
    }
    return true;
};

module.exports = { createAndSendOTP, verify_OTP };
