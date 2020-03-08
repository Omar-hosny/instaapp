const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
    // required: true
  },
  photo: {
    type: String,
    default: "no-photo.jpg"
  },
  caption: {
    type: String
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", PostSchema);
