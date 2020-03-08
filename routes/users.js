const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

// User model
const User = require("../models/User");

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Valisdate user befor save to database
    const { error } = registerValidation(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    // if (!name || !email || !password) {
    //   return res.json({
    //     msg: "Please enter all fields"
    //   });
    // }

    // Check if user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({
        success: false,
        msg: "User already exist.."
      });
    }

    // Hash The password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      success: false,
      data: err.message
    });
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Valisdate user befor save to database
    const { error } = loginValidation(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    // check if user exist
    const user = await User.findOne({ email }).select("+password"); // This select method because the password field is made as ( select : false )
    if (!user) {
      return res.status(404).json("user not found");
    }

    // check the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Password Incorrect" });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.header("auth-token", token).json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      data: err.message
    });
  }
});

module.exports = router;
