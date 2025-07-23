const Razorpay = require("razorpay");
const razorpay = new Razorpay({
key_id: process.env.RAZORPAY_KEY_ID,
key_secret: process.env.RAZORPAY_KEY_SECRET,
});
module.exports = razorpay;

server/routes/paymentRoutes.js

const express = require("express");
const router = express.Router();
const razorpay = require("../utils/razorpayInstance");
const crypto = require("crypto");

// Create Razorpay order
router.post("/create-order", async (req, res) => {
const { amount } = req.body;
const options = {
amount: amount * 100, // ₹100 = 10000 paise
currency: "INR",
receipt: "receipt_" + Date.now(),
};

try {
const order = await razorpay.orders.create(options);
res.json(order);
} catch (err) {
res.status(500).json({ error: "Order creation failed" });
}
});

// Verify payment
router.post("/verify", async (req, res) => {
const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

const body = razorpay_order_id + "|" + razorpay_payment_id;
const expectedSignature = crypto
.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
.update(body)
.digest("hex");

if (expectedSignature === razorpay_signature) {
res.json({ success: true, paymentId: razorpay_payment_id });
} else {
res.status(400).json({ success: false, message: "Payment verification failed" });
}
});

module.exports = router;