
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Booking = require("../models/Booking");


router.get("/", async (req, res) => {
try {
const movies = await Movie.find({});
res.json(movies);
} catch (err) {
res.status(500).json({ message: "Server error" });
}
});

router.get("/:id", async (req, res) => {
try {
const movie = await Movie.findById(req.params.id);
if (!movie) {
return res.status(404).json({ message: "Movie not found" });
}
res.json(movie);
} catch (err) {
res.status(500).json({ message: "Error fetching movie", error: err.message });
}
});

router.post("/bookings", async (req, res) => {
  const { movieId, seats, userId, showTime } = req.body;

  if (!movieId || !seats || !userId || !showTime) {
    return res.status(400).json({ message: "Missing booking data" });
  }

  try {
    const existing = await Booking.find({ movieId, showTime });
    const alreadyBooked = existing.flatMap(b => b.seats);
    const conflict = seats.some(seat => alreadyBooked.includes(seat));
    if (conflict) {
      return res.status(400).json({ message: "Some seats are already booked!" });
    }

    const newBooking = new Booking({ movieId, seats, userId, showTime });
    await newBooking.save();

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});


router.get("/bookings/user/:userId", async (req, res) => {
try {
const bookings = await Booking.find({ userId: req.params.userId });
res.json(bookings);
} catch (err) {
res.status(500).json({ message: "Failed to fetch bookings" });
}
});

router.get("/bookings/:movieId/:showTime", async (req, res) => {
const { movieId, showTime } = req.params;
try {
const bookings = await Booking.find({ movieId, showTime });
const bookedSeats = bookings.flatMap((b) => b.seats);
res.json(bookedSeats);
} catch (err) {
res.status(500).json({ message: "Failed to fetch booked seats" });
}
});

module.exports = router;