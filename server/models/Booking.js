const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  userId: {
    type: String, 
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  seats: [
    {
      type: String,
      required: true
    }
  ],
  paymentId: {
    type: String, 
    required: true
  },
  orderId: {
    type: String, 
    required: true
  },
  signature: {
    type: String, 
    required: true
  },
  receiptId: {
    type: String 
  },
  totalAmount: {
    type: Number, 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
