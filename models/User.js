const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
    minlength: 6,
  },
  avatar: {
    type: String,
    default: "no-photo.jpg",
  },
  bio: {
    type: String,
  },
  followers: [],
  following: [],
  posts: [
    // {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Post",
    // },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
