// backend/routes/payment.js

const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Booking = require("../models/Booking");
require("dotenv").config();

const router = express.Router();

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json(order);
  } catch (err) {
    console.error("❌ Razorpay order creation failed:", err);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
});

const isPaymentValid = (orderId, paymentId, signature) => {
  
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`) 
    .digest("hex");

  return expectedSignature === signature;
};

router.post("/verify", async (req, res) => {
  console.log("Received from client:", req.body);
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    selectedSeats,
    userId,
    movieId,
    showTime,
  } = req.body;

  const valid = isPaymentValid(razorpay_order_id, razorpay_payment_id, razorpay_signature);

  if (!valid) {
    return res.status(400).json({ success: false, msg: "Invalid payment signature" });
  }

  try {
    const booking = new Booking({
  movieId: new mongoose.Types.ObjectId(movieId), 
  seats: selectedSeats,
  userId,
  showTime,
  paymentId: razorpay_payment_id,
  orderId: razorpay_order_id,
  signature: razorpay_signature,
  totalAmount: selectedSeats.length * 150 * 100,
});

     console.log("Saving booking:", booking);
    await booking.save();

    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error("❌ Booking save failed:", err.message);
    res.status(500).json({ success: false, msg: "Booking save failed", error: err.message });
  }
});

module.exports = router;
