const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  model: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 1000,
  },

  fuel: {
    type: String,
    enum: ["Petrol", "Diesel", "Gase"],
    required: true,
  },

  image: {
    type: [String],
    validate: {
      validator: (images) => {
        if (Array.isArray(images) && images.length !== 0) {
          return true;
        }
        return false;
      },
      message: "At least one image is required!",
    },
  },

  capacity: {
    type: String,
    enum: ["xuv", "cedan"],
    required: true,
  },

  rentalPrice: {
    type: Number,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
