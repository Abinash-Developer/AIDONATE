const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {
  sendSuccessResponse,
  handleMongoError,
} = require("../helpers/responseHelper");
const ngoRegister = async (req, res) => {
  try {
    ngoFiles = [];
    req.files.forEach((element) => {
      ngoFiles.push(element.filename);
    });
    var user = new User({
      ngogovtId: req.body.ngoGovtId,
      ngoname: req.body.ngoName,
      email: req.body.email,
      phoneNumber: req.body.phone,
      state: req.body.state,
      district: req.body.district,
      pincode: req.body.pinCode,
      password: req.body.password,
      role: req.body.role,
      ngoFiles: ngoFiles,
    });
    const registerResponse = await user.save();
    sendSuccessResponse(res, registerResponse, "Ngo registered successfully");
  } catch (error) {
    handleMongoError(error, res);
  }
};
const userRegister = async (req,res)=>{
  try{
    var user = new User({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phone,
      state: req.body.state,
      district: req.body.district,
      pincode: req.body.pinCode,
      password:req.body.password,
      role:req.body.role,
    });
    const registerResponse = await user.save();
    sendSuccessResponse(res, registerResponse, "user registered successfully");
  }catch(error){
    handleMongoError(error, res);
  }
}
const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide username and password!",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: false,
        message: "Incorrect username or password",
      });
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: true,
      message: "Sign in successfully",
      token: token,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const signToken = (id) => {
  return jwt.sign({ id }, "aidonate", { expiresIn: "1d" });
};

module.exports = {
  ngoRegister,
  userRegister,
  userSignIn,
};
