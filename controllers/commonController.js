const State = require("../models/state");
const City = require("../models/city");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const Otp = require('../models/otpModel');
const { createAndSendOTP, verify_OTP } = require("../services/otpService");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helpers/responseHelper");
const getState = async (req, res) => {
  try {
    const stateResponse = await State.find({});
    sendSuccessResponse(res, stateResponse, "States are fetched successfully");
  } catch (error) {
    sendErrorResponse(res, error, "Failed to fetch states");
  }
};
const getCity = async (req, res) => {
  try {
    const stateId = req.params.id;
    const cities = await City.find({ state: stateId });
    sendSuccessResponse(res, cities, "States are fetched successfully");
  } catch (error) {
    sendErrorResponse(res, error, "Failed to fetch states");
  }
};
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser) {
      await createAndSendOTP(findUser);
      return res
        .status(200)
        .json({ success: true, message: "OTP sent to the user." });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const otpRecord = await Otp.findOne({ otp }).populate('userId');
    const isVerified = await verify_OTP(otp); 
    if (isVerified) {
      return res
        .status(200)
        .json({ success: true, message: "OTP verified successfully.",result:otpRecord });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};
const changePassword = async (req,res)=>{
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getState, getCity, checkEmail, verifyOtp,changePassword };
