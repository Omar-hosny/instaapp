const express = require("express");
const verify = require("./verifyToken");

const router = express.Router();

// Load Post model
const Post = require("../models/Post");
const User = require("../models/User");

//=============================Posts=======================// =>
// @desc    Create Post
// @route   POST /api/posts
// @access  Private
router.put("/", verify, async (req, res) => {
  let user = await User.findById(req.user.id);
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

    // make the photo : name of file
    req.body.photo = file.name;

    const post = await Post.create(req.body);
    // let post = new Post(req.body);

    const newPost = post;
    // user.posts.unshift(newPost);
    // await user.save();

    user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { posts: newPost } },
      {
        new: true,
        runValidators: true,
      }
    );

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

// @desc    Get follwing users posts
// @route   Get /api/posts/feed
// @access  Private
router.get("/feed", verify, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let followingPosts = await Post.find().sort({ createdAt: -1 });

    const { following } = user;
    const { posts } = user;

    let idOfFollowing = following.map((f) => f.id);

    // console.log(idOfFollowing);

    let postsFeed;

    postsFeed = followingPosts.filter(
      (postItem) =>
        (idOfFollowing.includes(postItem.userId) && postItem) ||
        (postItem.userId.toString() === req.user.id.toString() && postItem)
    );

    if (postsFeed.length === 0) {
      return res.send("No posts to show follow users to show their posts!");
    }

    res.status(200).json({
      success: true,
      count: postsFeed.length,
      data: postsFeed,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server Error");
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

//---------------- Comments -----------------------------// =>

// @desc    Add a comment
// @route   POST /api/posts/comment/:id => ID of the post
// @access  Private
router.put("/comment/:id", verify, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let post = await Post.findById(req.params.id);

    const text = req.body.text;
    if (!text) {
      return res.status(400).send("text is required!");
    }

    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    // post.comments.unshift(newComment);
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment } },
      {
        new: true,
        runValidators: true,
      }
    );

    await post.save();

    res.json(post);
    // console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc    Edit a comment
// @route   PUT /api/posts/comment/:id/:comment_id => ID of the comment
// @access  Private
router.put("/comment/:id/:comment_id", verify, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let post = await Post.findById(req.params.id);

    // pull out the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // make sure comment exist
    if (!comment) {
      return res.status(404).send("Comment does not exist");
    }

    // console.log(comment.name);
    // check user Owner of the comment
    if (comment.user.toString() !== user.id) {
      return res.status(401).send("User unauthorized!");
    }

    const text = req.body.text;
    if (!text) {
      return res.status(400).send("text is required!");
    }

    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    // update the comment
    // post.comments = post.comments.map((oldComment) =>
    //   oldComment.id === req.params.comment_id
    //     ? (oldComment = newComment)
    //     : oldComment
    // );

    // Update the comment in comments array in Post model
    // hint to remember here is comments._id => comments : comments array & _id is id of the comment that ia want to update
    post = await Post.findOneAndUpdate(
      { _id: req.params.id, "comments._id": req.params.comment_id },
      { $set: { "comments.$.text": text } }, // select text from comment to update to new one
      {
        runValidators: true,
        new: true,
      }
    );

    // await post.save();
    res.send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

router.delete("/comment/:id/:comment_id", verify, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let post = await Post.findById(req.params.id);

    // pull out the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // console.log(comment);
    // make sure comment exist
    if (!comment) {
      return res.status(404).send("Comment does not exist");
    }

    // check user Owner of the comment
    if (comment.user.toString() !== user.id) {
      return res.status(401).send("User unauthorized!");
    }

    // post.comments = post.comments.filter(
    //   ({ id }) => id !== req.params.comment_id
    // );

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: comment } },
      {
        new: true,
        runValidators: true,
      }
    );

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

//===========================Likes & unLike =====================// =>

// @desc    Add a like
// @route   PUT /api/posts/like/:id => ID of the post
// @access  Private
router.put("/like/:id", verify, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let post = await Post.findById(req.params.id);

    // Check if user already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).send("you already liked that post.");
    }

    const like = {
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    // post.likes.unshift(like);
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: like } },
      {
        runValidators: true,
        new: true,
      }
    );

    await post.save();

    res.status(200).json(post);
    // console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc    Remove the like (unLike)
// @route   PUT /api/posts/unlike/:id => ID of the post
// @access  Private
router.put("/unlike/:id", verify, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let post = await Post.findById(req.params.id);

    // Check if user already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).send("you have not been liked this post yet");
    }
    // Get remove index
    // const removeIndex = post.likes
    //   .map((like) => like.user.toString())
    //   .indexOf(req.user.id);

    // post.likes.splice(removeIndex, 1);

    const like = {
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: like } },
      {
        new: true,
        runValidators: true,
      }
    );

    await post.save();

    res.json(post);
    // console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
