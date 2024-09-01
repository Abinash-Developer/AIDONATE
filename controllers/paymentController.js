const Payment = require("../models/paymentodel");
const Razorpay = require('razorpay');
const {
  sendSuccessResponse,
  handleMongoError,
} = require("../helpers/responseHelper");
const createOrder = async (req,res)=>{
    try {
        const instance = new Razorpay({
          key_id: 'rzp_test_g4ALmVfn2IXdaU',
          key_secret: 'rFAJrfUkdp53deSIxJtR934h',
        });
        const options = {
          amount: req.body.amount * 100,
          currency: 'INR',
          receipt: 'order_rcptid_11',
        };
        const order = await instance.orders.create(options);
        res.json({ orderId: order.id });
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
      }
}
const savePaymentDetail = async (req,res)=>{
  try{
    const invoiceNumber = generateInvoiceNumber(); 
    var user = new Payment({
      user_id: req.body.user_id,
      charity_id: req.body.charity_id,
      razorpay_payment_id: req.body.razorpay_payment_id,
      razorpay_order_id: req.body.razorpay_order_id ,
      razorpay_signature: req.body.razorpay_signature,
      amount: req.body.amount,
      invoiceNumber:invoiceNumber
    });
    const paymentAddResponse = await user.save();
    sendSuccessResponse(res, paymentAddResponse, "Payment Created successfully");
  }catch(error){
    handleMongoError(error, res);
  }
}
const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString(); // Current timestamp
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  return `INV-${timestamp}-${randomNum}`;
};
module.exports = {createOrder,savePaymentDetail}