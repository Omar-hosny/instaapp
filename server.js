const express = require("express");
const fileUpload = require("express-fileupload");
// const config = require("config");
// const keys = config.get("NODE_ENV");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

// load config var
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const users = require("./routes/users");
const posts = require("./routes/posts");
const profile = require("./routes/profile");

const app = express();

// fileUpload
app.use(fileUpload());

// Body parser
app.use(express.json());

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
