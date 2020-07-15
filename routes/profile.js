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
    const posts = await Post.find({ userId: profile._id }).sort({
      createdAt: -1,
    });

    // user = await User.findById(req.params.id);

    if (posts) {
      profile.posts = posts;
    }
    // if (posts.map((post) => post.userId === profile._id).length === 0) {
    //   profile.posts = posts;
    //   posts.user = updUser;
    // }

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
// @route   PUT /api/profile/edit/:id
// @access  Private
router.put("/edit/:id", verify, async (req, res) => {
  try {
    // check auth
    if (req.user.id !== req.params.id) {
      return res.send("UnAuthorized to edit profile");
    }
    // check if user exist
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("No user found!");
    }
    // initialize body variable to update
    let body = {};

    // initialize b variable to update user object in each post when user update his avatar
    let p = {};

    // declare variable to update avatar in likes array of each post if user update his avatar
    // let updLike = {};

    // destructure vars of user object from req.user
    const { name, email, avatar } = req.user;

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

    // make p variable === the updated values of user to update user object in each post related to that user
    p.user = {
      name,
      email,
      avatar: req.files ? body.avatar : avatar,
    };

    // TODO
    // updLike.likes = {
    //   user: req.user.id,
    //   name,
    //   avatar: req.files ? body.avatar : avatar,
    // };

    // bio of user profile if user updated his bio
    if (req.body.bio) {
      body.bio = req.body.bio;
    }

    // update each post of user with his updated avatar and name and email
    const ps = await Post.updateMany({ userId: req.user._id }, p, {
      new: true,
      runValidators: true,
    });

    //  TODO update each like with updated avatar

    // const updateLike = await Post.updateMany({ userId: req.user.id }, updLike, {
    //   new: true,
    //   runValidators: true,
    // });

    user = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    // update user obj in user posts array
    user.posts.map((post) => (post.user = p.user));

    await user.save();

    // console.log(ps.length);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
