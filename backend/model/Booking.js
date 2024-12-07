const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  carId: {
    type: mongoose.Types.ObjectId,
    ref: "Car",
    required: true,
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
