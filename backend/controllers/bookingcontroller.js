const Booking = require("../model/Booking");
const Car = require("../model/Car");

const addBooking = async (req, res) => {
  try {
    const { startDate, endDate, userId, carId, address } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid booking dates!" });
    }

    const overlappingBooking = await Booking.findOne({
      carId: carId,
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        success: false,
        msg: "The selected dates are not available for this car!",
      });
    }

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ success: false, msg: "Car not found!" });
    }

    const rentalPrice = car.rentalPrice;

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const durationInDays = Math.ceil((end - start) / millisecondsInDay) + 1;

    const totalPrice = durationInDays * rentalPrice;

    const addedBooking = await Booking.create({
      startDate: start,
      endDate: end,
      totalPrice: totalPrice,
      carId: carId,
      userId: userId,
      shippingAddress: address,
    });

    res.status(200).json({ success: true, data: addedBooking });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = { addBooking };
