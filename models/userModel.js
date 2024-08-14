const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
  },
  ngogovtId: {
    type: String,
    required: false,
  },
  ngoname: {
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
    unique: true,
  },
  country: {
    type: String,
    enum: ["india", "outindia"],
    default: "india",
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "state",
    required: true
  },
  district: {
    type: Schema.Types.ObjectId,
    ref:'city',
    required: true
  },
  pincode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "ngo"],
    default: "user",
  },
  ngoFiles:{
   type: [String],
   required:false,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phoneNumber: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
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
