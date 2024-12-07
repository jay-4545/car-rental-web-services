const User = require("../model/User");
const userValidator = require("../validators/userValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "thea.howe@ethereal.email",
    pass: "s2W4CKc3ZR65ap1RjX",
  },
});

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "No such user found!" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    // userValidator(req.body);
    // const existingUser = await User.findOne({ email: req.body.email });
    // if (existingUser) {
    //   return res.status(404).json({
    //     success: false,
    //     msg: "Email already exists!",
    //   });
    // }
    // const numberOfUser = await User.countDocuments();
    // if (numberOfUser === 0) {
    //   req.body.role = "mainAdmin";
    // }
    // const salt = bcrypt.genSaltSync(10);
    // req.body.password = bcrypt.hashSync(req.body.password, salt);
    // const verificationToken = crypto.randomBytes(64).toString("hex");
    // req.body.verificationToken = verificationToken;
    // const user = await User.create(req.body);
    // const verificationLink = `http://localhost:3000/verifyEmail?token=${verificationToken}&userId=${user._id}`;
    // const info = await transporter.sendMail({
    //   from: `"Jay Kukadiya" <${process.env.ETHEREAL_USERNAME}>`,
    //   to: req.body.email,
    //   subject: "Verification Email",
    //   html: `<p>Please click on this link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`,
    // });
    // if (!info?.messageId) {
    //   return res
    //     .status(500)
    //     .json({ success: false, msg: "Failed to send verification!" });
    // }
    // res.status(200).json({ success: true, msg: "Sign-up successfull!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token, userId } = req.query;

    if (!token || !userId) {
      return res
        .status(401)
        .json({ success: false, msg: "No token or userId provided!" });
    }

    const user = await User.findOne({ _id: userId, verificationToken: token });

    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
      verificationToken: "",
    });

    res
      .status(200)
      .json({ success: true, msg: "Email verified successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    if (!req.body.email.trim() || !req.body.password.trim()) {
      return res
        .status(404)
        .json({ success: true, msg: "Email and password are required!" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ success: false, msg: "Invalid email!" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ success: false, msg: "Email not verified!" });
    }

    const isPasswordSame = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordSame) {
      return res.status(400).json({ success: false, msg: "Invalid password!" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        fame: user.fname,
        lame: user.lname,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const checkUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const signOut = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "No such user exists!",
      });
    }

    res.status(200).json({ success: true, msg: "Sign-out successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  signUp,
  verifyEmail,
  signIn,
  checkUser,
  signOut,
};
