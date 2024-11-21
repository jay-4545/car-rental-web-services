const express = require("express");
const connectDatabase = require("./db/connect");
const carRouter = require("./routes/carRouter");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());

server.use("/uploads", express.static("uploads"));

server.use("/cars", carRouter);
server.use("/users", userRouter);

const start = async () => {
  try {
    await connectDatabase();
    console.log("Connect to database");
    server.listen(process.env.PORT, () => {
      console.log(`server is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error: ", error.mesaage);
  }
};

start();
