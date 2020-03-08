const express = require("express");

const router = express.Router();

// @desc    Create Post
// @route   POST /api/posts
// @access  Private
router.post("/", (req, res) => {
  res.send("Create Post works!");
});

// @desc    Create Post
// @route   Get /api/posts
// @access  public
router.get("/", (req, res) => {
  res.send("Get Posts works!");
});

// @desc    Get Post by id
// @route   Get /api/posts/:id
// @access  public
router.get("/:id", (req, res) => {
  res.send("Get Post by id works!");
});

// @desc    Update post
// @route   UPDATE /api/posts/:id
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Update Post works!");
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete Post  works!");
});

module.exports = router;
