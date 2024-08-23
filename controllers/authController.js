const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id, role) => {
  return jwt.sign({ id, role }, "your_jwt_secret", { expiresIn: "1d" });
};

exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const newUser = await User.create({ email, password, role });

    const token = signToken(newUser._id, newUser.role);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
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

    const token = signToken(user._id, user.role);
    req.session.token = token;
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
