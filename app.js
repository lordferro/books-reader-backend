const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");
const viewsRouter = require("./routes/views");

const app = express();

// use temple engine pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
// check content-type of body request, if application/json and make object from string
app.use(express.json());
// if get request for files, go to public folder
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/", viewsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

module.exports = app;
