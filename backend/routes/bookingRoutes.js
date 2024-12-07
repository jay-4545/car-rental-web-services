const express = require("express");
const { addBooking } = require("../controllers/bookingcontroller");
const bookingRouter = express.Router();

bookingRouter.post("/", addBooking);

module.exports = bookingRouter;
