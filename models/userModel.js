const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: false,
    },
    country: {
      type: String,
      required: true,
      enum: ["India", "OutsideIndia"],
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "ngo"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    ngoGovtId: {
      type: String,
      required: false,
    },
    ngoName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // if (!this.isModified("password") || this.isGoogleUser) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
