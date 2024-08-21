const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  charity_id: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  payment_type: {
    type: String,
    enum:["charity","campaigns"],
    default:"charity",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("payment", paymentSchema);
