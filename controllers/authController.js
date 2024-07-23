const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, "your_jwt_secret", { expiresIn: "1d" });
};

exports.signup = async (req, res) => {
  console.log(req.body)
  // try {
  //   const {
  //     first_name,
  //     last_name,
  //     phoneNumber,
  //     country,
  //     state,
  //     district,
  //     pinCode,
  //     ngoGovtId,
  //     ngoName,
  //     status,
  //     email,
  //     password,
  //     role,
  //   } = req.body;
  //   const newUser = await User.create({
  //     first_name,
  //     last_name,
  //     phoneNumber,
  //     country,
  //     state,
  //     district,
  //     pinCode,
  //     ngoGovtId,
  //     ngoName,
  //     status,
  //     email,
  //     password,
  //     role,
  //   });
  //   const token = signToken(newUser._id);
  //   console.log(token);
  //   const existingUser = await User.findOne({ email: email });
  //   if (existingUser) {
  //     res.status(200).json({ exists: true, message: "Email already exists" });
  //   } else {
  //     res.status(201).json({
  //       status: "success",
  //       token,
  //       data: {
  //         user: newUser,
  //       },
  //     });
  //   }
  // } catch (err) {
  //   res.status(400).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username and password!",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
