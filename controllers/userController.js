const User = require("../models/userModel");
const UserMeta = require("../models/userMetaModel");
const Payment = require("../models/paymentodel");
const Wishlist = require("../models/wishlistModel");
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
      role: req.body.role
    });
    const registerResponse = await user.save();
    const metaData = {
      documents: ngoFiles,
    };
    await saveUserMeta(registerResponse._id, metaData);
    sendSuccessResponse(res, registerResponse, "Ngo registered successfully");
  } catch (error) {
    handleMongoError(error, res);
  }
};
const userRegister = async (req,res)=>{
  // console.log(req.body);
  // return;
  try{
    var user = new User({
      first_name: req.body.firstName || req.body.firstName,
      last_name: req.body.lastName || req.body.lastName,
      email: req.body.email || req.body.email,
      phoneNumber: req.body.phone || req.body.phone,
      state: req.body.state || req.body.state,
      district: req.body.district || req.body.district,
      pincode: req.body.pinCode || req.body.pinCode,
      password:req.body.password || req.body.password,
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

const saveUserMeta = async (userId, metaData) => {
  const metaEntries = Object.keys(metaData).map(key => ({
    meta_id: userId,
    meta_key: key,
    meta_value: JSON.stringify(metaData[key]),
  }));

  await UserMeta.insertMany(metaEntries);
};
const signToken = (id) => {
  return jwt.sign({ id }, "aidonate", { expiresIn: "1d" });
};


// NGO SECTION
const getNgo = async (req,res)=>{
  try{
    const date = req.query.date ? new Date(req.query.date) : null;
    const ngos = await User.find({
      $and:  [
        { status: 'active' },
        { role: 'ngo' },
        ...(req.query.date
          ? [
              {
                $expr: {
                  $eq: [
                    { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
                    req.query.date
                  ]
                }
              }
            ]
          : [])
      ]
    });
  const sums = await Payment.aggregate([
    {
      $group: {
        _id: '$charity_id',
        totalAmount: { $sum: { $toDouble: '$amount' } }
      }
    }
  ]);
const paymentMap = {};
sums.forEach(payment => {
  paymentMap[payment._id.toString()] = payment.totalAmount;
});
var ngoArray = [];
for (const ngo of ngos) {
  const ngoObject = ngo.toObject();
  const ngoId = ngoObject._id.toString(); 
  if (paymentMap.hasOwnProperty(ngoId)) {
      ngoObject.paymentAmount = paymentMap[ngoId];
      const goalAmount = await UserMeta.findOne({
        meta_id: ngoId,
        meta_key: 'goal'
      });
      const goalValue = parseFloat(goalAmount.meta_value);
      const amountPaid = parseFloat(ngoObject.paymentAmount);
      var percentage = (amountPaid / goalValue) * 100;
      ngoObject.percentage = parseInt(percentage); 
  }else{
     ngoObject.paymentAmount = 0;
     ngoObject.percentage=0;
  }
  ngoArray.push(ngoObject);
}
const sortOrder = req.query.price;

ngoArray.sort((a, b) => {
  if (sortOrder === 'asc') {
    return a.paymentAmount - b.paymentAmount;
  } else {
    return b.paymentAmount - a.paymentAmount;
  }
});
   sendSuccessResponse(res, ngoArray, "Ngo's are fetched successfully");
  } catch (error) {
    sendErrorResponse(res, error, "Failed to fetch ngo's");
  }
}
const getUserDetail = async (req,res)=>{
  try{
    const userDetail = await User.findOne({_id:req.userId});
    sendSuccessResponse(res, userDetail, "userDetail fetched successfully");
  }catch(error){
    sendErrorResponse(res, error, "Failed to fetch user");
  }
}
const addToWishlist = async (req,res)=>{
  const  ngo_id  = req.params.id;
  const user_id = req.userId;
  try {
    const newWishlistItem = new Wishlist({
      user_id,
      ngo_id,
    });
    const savedWishlist = await newWishlistItem.save();
    sendSuccessResponse(res, savedWishlist, "Wishlist saved successfully");
  } catch (error) {
    sendErrorResponse(res, error, "Failed to saved wishlist");
  }
}


const getDonationHistory = async(req,res)=>{
  try{
    const donationHistory = await Payment.find({user_id:req.params.id}).populate('charity_id');
    sendSuccessResponse(res, donationHistory, "Donation History fetched successfully");
  }catch(error){
    sendErrorResponse(res, error, "Failed to fetch user");
  }
}
module.exports = {
  ngoRegister,
  userRegister,
  userSignIn,
  getNgo,
  getUserDetail,
  addToWishlist,
  getDonationHistory
};
