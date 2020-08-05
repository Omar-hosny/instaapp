const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verify = require("./verifyToken");

const { registerValidation, loginValidation } = require("../validation");

// User model
const User = require("../models/User");

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Valisdate user befor save to database
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    // // Check if user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send("User already exist..");
    }

    // Hash The password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
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
    const user = await User.findOne({ email }); // This select method because the password field is made as ( select : false )
    if (!user) {
      return res.status(404).json("user not found");
    }

    // check the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Password Incorrect");
    }

    // create token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        followers: user.followers,
        following: user.following,
      },
      process.env.SECRET
    );
    res.header("auth-token", token).send(token);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      data: err.message,
    });
  }
});

// @desc   make a follow request
// @route   POST /api/users/follow/:id
// @access  Private
// router.post("/follow/:id", verify, async (req, res) => {
//   try {
//     const user1 = await User.findById(req.params.id); // the user i want to follow
//     const user = await User.findById(req.user.id); // the logged in user
//     if (!user1) {
//       return res.status(404).send("User not found..");
//     }
//     if (!user) {
//       return res.status(404).send("User logged in not found...");
//     }

//     // the logged in user
//     const followerUser = {
//       id: user.id,
//       name: user.name,
//       avatar: user.avatar,
//     };

//     // the user i want to follow
//     const followingUser = {
//       id: user1._id,
//       name: user1.name,
//       avatar: user1.avatar,
//     };
//     // console.log(followingUser, followerUser);

//     // Check if user already follow
//     if (user1.followers.filter((item) => item.id === req.user.id).length > 0) {
//       return res.status(400).send("already followed that user!");
//     } else if (
//       user.following.filter((item) => item.id === req.params.id).length > 0
//     ) {
//       return res.status(400).send("You already followed that user");
//     }
//     // push it into followers & following array
//     user1.followers.unshift(followerUser);
//     user.following.unshift(followingUser);

//     await user1.save();
//     await user.save();
//     // res.status(200).json({
//     //   success: true,
//     //   data: user.following,
//     // });

//     res.status(200).send(user.following);
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).send("Server Error..");
//   }
// });
router.put("/follow/:id", verify, async (req, res) => {
  try {
    let user1 = await User.findById(req.params.id); // the user i want to follow
    let user = await User.findById(req.user.id); // the logged in user
    if (!user1) {
      return res.status(404).send("User not found..");
    }
    if (!user) {
      return res.status(404).send("User logged in not found...");
    }

    // the logged in user
    const followerUser = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };

    // the user i want to follow
    const followingUser = {
      id: user1._id,
      name: user1.name,
      avatar: user1.avatar,
    };
    // console.log(followingUser, followerUser);

    // Check if user already follow

    if (user1.followers.filter((item) => item.id === req.user.id).length > 0) {
      return res.status(400).send("already followed that user!");
    } else if (
      user.following.filter((item) => item.id === req.params.id).length > 0
    ) {
      return res.status(400).send("You already followed that user");
    }

    // push it into followers & following array
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { following: followingUser } },
      {
        new: true,
        runValidators: true,
      }
    );

    user1 = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { followers: followerUser } },
      {
        new: true,
        runValidators: true,
      }
    );

    await user1.save();
    await user.save();
    // res.status(200).json({
    //   success: true,
    //   data: user.following,
    // });

    res.status(200).send(user1);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server Error..");
  }
});

// @desc    Remove follow ( Unfollow request)
// @route   POST /api/users/unfollow/:id
// @access  Private
router.put("/unfollow/:id", verify, async (req, res) => {
  try {
    let user1 = await User.findById(req.params.id); // the user i want to unfollow
    let user = await User.findById(req.user.id); // the logged in user
    if (!user1) {
      return res.status(404).send("User not found..");
    }
    if (!user) {
      return res.status(404).send("User logged in not found...");
    }

    // const unfollowedUser = {
    //   id: user1._id,
    //   name: user1.name,
    //   avatar: user1.avatar,
    // };

    // the logged in user
    const followerUser = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };

    // the user i want to follow
    const followingUser = {
      id: user1._id,
      name: user1.name,
      avatar: user1.avatar,
    };

    // Check if user already follow
    if (user1.followers.filter((item) => item.id === user.id).length > 0) {
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { following: followingUser } },
        {
          new: true,
          runValidators: true,
        }
      );

      user1 = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { followers: followerUser } },
        {
          new: true,
          runValidators: true,
        }
      );

      await user1.save();
      await user.save();
    } else {
      return res.status(400).send("You have not followed that user yet");
    }

    res.status(200).send(user1);
  } catch (err) {
    res.status(400).send("Server Error...");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json("No users found!");
    }

    // let usersNames = users.map((user) => user.name);

    res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server Error ..");
  }
});

// router.post("/unfollow/:id", verify, async (req, res) => {
//   try {
//     const user1 = await User.findById(req.params.id); // the user i want to unfollow
//     const user = await User.findById(req.user.id); // the logged in user
//     if (!user1) {
//       return res.status(404).send("User not found..");
//     }
//     if (!user) {
//       return res.status(404).send("User logged in not found...");
//     }
//     // Check if user already follow
//     if (user1.followers.filter((item) => item.id === user.id).length > 0) {
//       const removeIndex = user1.followers
//         .map((item) => item.id.toString())
//         .indexOf(req.user.id);
//       user1.followers.splice(removeIndex, 1);
//       const removeIndex2 = user.following
//         .map((item) => item.id.toString())
//         .indexOf(req.params.id);
//       user.following.splice(removeIndex2, 1);
//       await user1.save();
//       await user.save();
//     } else {
//       return res.status(400).send("You have not followed that user yet");
//     }

//     const unfollowedUser = {
//       id: user1._id,
//       name: user1.name,
//       avatar: user1.avatar,
//     };

//     // res.status(200).json({
//     //   success: true,
//     //   data: unfollowedUser,
//     // });

//     res.status(200).send(unfollowedUser);
//   } catch (err) {
//     res.status(400).send("Server Error...");
//   }
// });

module.exports = router;
