const Car = require("../model/Car");
const MyError = require("../utils/errorUtils");

const carValidator = async (body, id) => {
  if (!body.name) {
    throw new MyError("Name is required", 400);
  }

  if (!body.model) {
    throw new MyError("Model is required", 400);
  }

  if (!body.desc) {
    throw new MyError("Description is required!", 400);
  }

  if (body.desc?.trim().length < 10) {
    throw new MyError("Description must be atleat 20 characters!", 400);
  }

  if (!body.fuel) {
    throw new MyError("Fuel type is required", 400);
  }

  if (!body.capacity) {
    throw new MyError("Capacity is required", 400);
  }

  if (!body.rentalPrice) {
    throw new MyError("RentalPrice is required", 400);
  }

  if (!body.slug) {
    throw new MyError("Slug is required!", 400);
  }

  if (id) {
    const existingCarById = await Car.findById(id);
    const existingCarBySlug = await Car.findOne({ slug: body.slug });

    if (
      existingCarById &&
      existingCarBySlug &&
      existingCarById.slug !== existingCarBySlug.slug
    ) {
      throw new MyError("Car slug already exists!", 400);
    }
  } else {
    const existingCar = await Car.findOne({ slug: body.slug });
    if (existingCar) {
      throw new MyError("Car slug already exists!", 400);
    }
  }
};

module.exports = carValidator;
