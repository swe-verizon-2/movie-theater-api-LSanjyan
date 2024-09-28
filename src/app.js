const express = require("express");
const app = express();
const { db } = require("../db/connection");
const userRouter = require("./routes/User");
const showRouter = require("./routes/Show");
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/users", userRouter);
app.use("/shows", showRouter);

module.exports = app;
