const express = require("express");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

// load config var
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const users = require("./routes/users");
const posts = require("./routes/posts");

const app = express();

// fileUpload
app.use(fileUpload());

// Body parser
app.use(express.json());

app.use("/api/users", users);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);