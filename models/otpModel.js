const mongoose = require("mongoose");
const User = require('../models/userModel');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now, index: { expires: 86400 } },
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
