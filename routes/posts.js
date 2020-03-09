const express = require("express");

const router = express.Router();

// Load Post model
const Post = require("../models/Post");

// @desc    Create Post
// @route   POST /api/posts
// @access  Private
router.post("/", async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No Photo uploaded" });
    }

    // save the photo
    const file = req.files.file;

    // path for a photo
    file.mv(`uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        // return res.status(500).send(err);
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

    const { caption } = req.body;

    const post = await Post.create({
      photo: file.name,
      caption
    });

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// @desc    Get all Post
// @route   Get /api/posts
// @access  public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
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
      error: err.message
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
router.put("/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (req.files === null) {
      return res.status(400).json({ msg: "No Photo uploaded" });
    }

    // get the photo
    const file = req.files.file;

    if (!post) {
      return res.status(404).json({
        success: false,
        data: "That post does not exist.."
      });
    }

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
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.send("No post found");
    }

    post.remove();

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
