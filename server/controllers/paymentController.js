// controller/paymentController.js
const crypto = require('crypto');

exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    // 🟢 Save booking, mark seats, etc.
    return res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    // 🔴 Signature mismatch
    return res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};
