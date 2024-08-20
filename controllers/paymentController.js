const Razorpay = require('razorpay');
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
const createUser = async (req,res)=>{
  console.log(req.body)
}
module.exports = {createOrder,createUser}