const express = require("express");
require("dotenv").config();
const passport = require("./auth/google");
const session = require("express-session");
const app = express();
const port = process.env.port || 3000;
const sequelize = require("./config/database");
const User = require("./user/model");
const userRouter = require("./user/route");
const GoogleRouter = require("./auth/route");
app.use(express.json());
app.get("/", (req, res) => {
  res.send('<a href="/auth/signup">Sign up with Google</a>');
});
app.use("/user", userRouter);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", GoogleRouter);
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("db connection failed", err);
  });
