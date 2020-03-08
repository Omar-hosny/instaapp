const express = require("express");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

// load config var
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const users = require("./routes/users");

const app = express();

// Body parser
app.use(express.json());

app.use("/api/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
