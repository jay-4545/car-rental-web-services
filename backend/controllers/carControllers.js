const path = require("path");
const Car = require("../model/Car");
const carValidator = require("../validators/carValidator");
const { addFiles, addSingleFile, deleteFiles } = require("../utils/fileUtils");
const minTwoFilesValidator = require("../validators/commonValidator");

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ success: true, msg: "No such car found!" });
    }

    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getCarBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const car = await Car.findOne({ slug });

    if (!car) {
      res.status(404).json({ success: false, msg: "No such car found!" });
    }

    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addCar = async (req, res) => {
  try {
    await carValidator(req.body);

    req.body.image = await addFiles(req.files.image, "car");

    const car = await Car.create(req.body);

    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCar = await Car.findById(id);

    if (!existingCar) {
      return res
        .status(404)
        .json({ success: false, msg: "No such car found!" });
    }

    await carValidator(req.body, id);

    minTwoFilesValidator(req.files?.image, req.body.image);

    if (!req.body.image) {
      req.body.image = [];
    } else if (req.body.image && !Array.isArray(req.body.image)) {
      req.body.image = [req.body.image];
    }

    let images = [];

    if (req.files?.image) {
      if (Array.isArray(req.files.image)) {
        const urls = await addFiles(req.files.image, "car");
        images = images.concat(urls);
      } else {
        const url = await addSingleFile(req.files.image, "car");
        images.push(url);
      }
    }

    await deleteFiles(existingCar.image, "car", req.body.image);

    const updatedCar = await Car.findByIdAndUpdate(id, {
      ...req.body,
      image: [...images, ...req.body.image],
    });

    res.status(200).json({ success: true, data: updatedCar });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCar = await Car.findById(id);

    if (!existingCar) {
      return res
        .status(404)
        .json({ success: false, msg: "No such car found!" });
    }

    await deleteFiles(existingCar.image, "car");

    await Car.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "Car deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllCars,
  getCar,
  getCarBySlug,
  addCar,
  updateCar,
  deleteCar,
};
