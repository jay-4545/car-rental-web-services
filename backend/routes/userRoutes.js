const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  signIn,
  signUp,
  signOut,
  verifyEmail,
  checkUser,
} = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.get("/signout", signOut);
userRouter.get("/verifyEmail", verifyEmail);
userRouter.get("/checkUser", checkUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
