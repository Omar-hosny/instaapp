const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const verify = require("./verifyToken");

// Load User Model
const User = require("../models/User");
const Post = require("../models/Post");

// @desc    Get Profile by id
// @route   GET /api/profile/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    let user = req.params.id;
    const re = /^[0-9a-fA-F]{24}$/;
    if (!re.test(user)) {
      return res.status(404).send("There is no profile for that user...");
    }
    const profile = await User.findById(req.params.id).select("-password");
    if (!profile) {
      return res.status(404).send("There is no profile for that user");
    }

    // check if user have posts to show in their profile
    const posts = await Post.find().sort({ createdAt: -1 });

    if (posts.map((post) => post.userId === profile._id).length > 0) {
      profile.posts = posts;
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message,
    });
  }
});

// @desc    Edit profile
// @route   POST /api/profile/edit/:id
// @access  Private
router.post("/edit/:id", verify, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.send("UnAuthorized to edit profile");
    }
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("No user found!");
    }
    // initialise body variable
    let body = {};

    // check if req.file
    if (req.files) {
      // return res.status(400).send("No Photo uploaded");

      // save the photo
      const file = req.files.file;
      // console.log(file);
      file.mv(`client/public/uploads/avatar/${file.name}`, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        // res.json({ fileName: file.name, photoPath: `/uploads/${file.name}` });
      });
      // make avatar = file.name
      body.avatar = file.name;
    }

    // make the avatar : name of file
    // req.body.avatar = file.name;

    // bio of user profile
    body.bio = req.body.bio;

    user = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      success: false,
      data: err.message,
    });
  }
});

module.exports = router;
