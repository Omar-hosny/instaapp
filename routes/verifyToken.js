const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json("Access denied!");
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    console.log(verified);
    req.user = await User.findById(verified._id);
  } catch (err) {
    return res.status(400).json("Invalid token");
  }
  next();
};
