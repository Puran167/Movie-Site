
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const crypto = require("crypto");

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET
router.post("/", async (req, res) => {
  const {
    movieId,
    seats,
    userId,
    showTime,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;


  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    console.log("❌ Signature mismatch:", { expectedSignature, razorpay_signature });
    return res.status(400).json({ success: false, msg: "Invalid payment signature" });
  }

  try {

    const existing = await Booking.find({
      movieId,
      showTime,
      seats: { $in: seats },
    });

    if (existing.length > 0) {
      return res.status(409).json({
        message: "❌ Some seats already booked",
        conflictSeats: existing.flatMap((b) => b.seats),
      });
    }
    const newBooking = new Booking({
      movieId,
      seats,
      userId,
      showTime,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature, 
    });
    await newBooking.save();

    return res.status(201).json({ success: true, booking: newBooking });
  } catch (err) {
    console.error("Booking failed", err);
    return res.status(500).json({ success: false, msg: "Booking error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("movieId");
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    return res.json({
      ...booking.toObject(),
      movieTitle: booking.movieId?.title,
    });
  } catch (err) {
    console.error("Fetch receipt error", err);
    res.status(500).json({ msg: "Error fetching booking" });
  }
});


module.exports = router;
