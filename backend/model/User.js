const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minLength: 2,
  },

  lname: {
    type: String,
    required: true,
    minLength: 1,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        if (!email) return false;

        const isValidEmail = email.match(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        );

        if (!isValidEmail) {
          return false;
        }
        return true;
      },

      message: "Please provide a valid email address!",
    },
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "user", "mainAdmin"],
    default: "user",
  },

  avatar: {
    type: String,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  resetToken: {
    type: String,
  },

  verificationToken: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
