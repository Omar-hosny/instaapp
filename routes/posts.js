const express = require("express");
const verify = require("./verifyToken");

const router = express.Router();

// Load Post model
const Post = require("../models/Post");
const User = require("../models/User");

// @desc    Create Post
// @route   POST /api/posts
// @access  Private
router.post("/", verify, async (req, res) => {
  const user = await User.findById(req.user.id);
  // Set user to user. _id
  req.body.userId = req.user.id;
  // set post name to post Owner which is req.user.name
  // req.body.name = req.user.name;

  // set user to user object
  const { name, email, avatar } = user;

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

    file.mv(`client/public/uploads/${file.name}`, (err) => {
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

    const newPost = post;
    user.posts.unshift(newPost);
    await user.save();

    // console.log(posts);
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      success: false,
      data: err.message,
    });
  }
});

// @desc    Get all Post
// @route   Get /api/posts
// @access  public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    if (posts.length === 0 || !posts) {
      return res.status(404).json({
        success: false,
        data: "No posts found.",
      });
    }
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      data: err.message,
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

    // find user owner of the post and update the avatar in the post before return
    const { userId } = post;
    const user = await User.findById(userId);

    const { avatar, name, email } = user;

    post.user = {
      name,
      email,
      avatar,
    };
    // console.log(user);

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({
      success: false,
      data: "No posts found!",
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
        data: "That post does not exist..",
      });
    }

    let body = {};
    // if (req.files === null) {
    //   return res.status(400).json({ msg: "No Photo uploaded" });
    // }

    if (req.files) {
      // get the photo
      const file = req.files.file;

      file.mv(`client/public/uploads/${file.name}`, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        // res.json({ fileName: file.name, photoPath: `/uploads/${file.name}` });
      });

      body.photo = file.name;
    }

    if (req.body.caption) {
      body.caption = req.body.caption;
    }

    // const body = {
    //   photo,
    //   caption,
    // };

    post = await Post.findByIdAndUpdate(req.params.id, body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      success: false,
      data: err.message,
    });
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
router.delete("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() !== req.user.id.toString()) {
      return res.status(401).json("Unauthorized to delete that post");
    }
    if (!post) {
      return res.send("No post found");
    }

    const user = await User.findById(req.user.id);

    if (user.posts.filter((post) => post._id === req.params.id).length === 0) {
      const removeIndex = user.posts
        .map((post) => post._id.toString())
        .indexOf(req.params.id);
      user.posts.splice(removeIndex, 1);
    }

    await user.save();

    await post.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({
      success: false,
      data: "No posts found!",
    });
  }
});

module.exports = router;
