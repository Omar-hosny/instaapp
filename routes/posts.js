const express = require("express");
const verify = require("./verifyToken");

const router = express.Router();

// Load Post model
const Post = require("../models/Post");

// @desc    Create Post
// @route   POST /api/posts
// @access  Private
router.post("/", verify, async (req, res) => {
  // Set user to user. _id
  req.body.userId = req.user.id;
  // set post name to post Owner which is req.user.name
  // req.body.name = req.user.name;

  // set user to user object
  const { name, email, avatar } = req.user;
  req.body.user = { name, email, avatar };
  // console.log(req.user.name);
  try {
    if (req.files === null) {
      return res.status(400).send("No Photo uploaded");
    }

    // save the photo
    const file = req.files.file;

    // path for a photo
    // file.mv(`uploads/${file.name}`, err => {
    //   if (err) {
    //     console.error(err);
    //     // return res.status(500).send(err);
    //   }
    //   // res.json({ fileName: file.name, photoPath: `/uploads/${file.name}` });
    // });

    file.mv(`client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      // res.json({ fileName: file.name, photoPath: `/uploads/${file.name}` });
    });

    // file.mv(`${__dirname}/${__dirname}/uploads/${file.name}`, err => {
    //   if (err) {
    //     console.error(err);
    //     // return res.status(500).send(err);
    //   }
    //   // res.json({ fileName: file.name, photoPath: `/uploads/${file.name}` });
    // });

    // const { caption } = req.body;

    // const post = await Post.create({
    //   photo: file.name,
    //   caption
    // });

    // make the photo : name of file
    req.body.photo = file.name;

    const post = await Post.create(req.body);
    // console.log(file);
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      success: false,
      data: err.message
    });
  }
});

// @desc    Get all Post
// @route   Get /api/posts
// @access  public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        data: "No posts found."
      });
    }
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      data: err.message
    });
  }
});

// @desc    Get Post by id
// @route   Get /api/posts/:id
// @access  public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.send("No post found");

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({
      success: false,
      data: "No posts found!"
    });
  }
});

// @desc    Update post
// @route   UPDATE /api/posts/:id
// @access  Private
router.put("/:id", verify, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json("Unauthorized to edit that post");
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        data: "That post does not exist.."
      });
    }

    if (req.files === null) {
      return res.status(400).json({ msg: "No Photo uploaded" });
    }

    // get the photo
    const file = req.files.file;

    file.mv(`client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      // res.json({ fileName: file.name, photoPath: `/uploads/${file.name}` });
    });

    const body = {
      photo: file.name,
      caption: req.body.caption
    };

    post = await Post.findByIdAndUpdate(req.params.id, body, {
      runValidators: true,
      new: true
    });

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      success: false,
      data: err.message
    });
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
router.delete("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json("Unauthorized to delete that post");
    }
    if (!post) {
      return res.send("No post found");
    }

    await post.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({
      success: false,
      data: "No posts found!"
    });
  }
});

module.exports = router;
