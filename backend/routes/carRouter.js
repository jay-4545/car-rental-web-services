const express = require("express");
const carRouter = express.Router();
const {
  getAllCars,
  getCar,
  addCar,
  updateCar,
  deleteCar,
  getCarBySlug,
} = require("../controllers/carControllers");

carRouter.get("/", getAllCars);
carRouter.get("/:id", getCar);
carRouter.get("/cardetails/:slug", getCarBySlug);
carRouter.post("/", addCar);
carRouter.patch("/:id", updateCar);
carRouter.delete("/:id", deleteCar);

module.exports = carRouter;
