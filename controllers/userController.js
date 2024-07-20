
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendSuccessResponse,sendBadRequestResponse } = require('../helpers/responseHelper');

const userRegister = async (req, res) => {
    let user = new User(req.body);
    const registerDetail = await user.save();
    sendSuccessResponse(res,registerDetail,'User registered successfully')
};
const userSignIn = async (req,res) =>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            sendBadRequestResponse(res,'Please provide username and password!',400)
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            sendBadRequestResponse(res,'Incorrect username or password',401);
        }
        const token = signToken(user._id);
        res.status(200).json({
            status: true,
            message:"Sign in successfully",
            token:token,
            data:user
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}
const signToken = (id) => {
    return jwt.sign({ id }, 'aidonate', { expiresIn: '1d' });
};

module.exports = {
    userRegister,
    userSignIn
};