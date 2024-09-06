const express = require("express");
const passport = require("passport");
const GoogleRouter = express.Router();

// Redirect to Google for authentication
GoogleRouter.get(
  "/signup",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
GoogleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Successful authentication
    res.redirect("/dashboard");
  }
);

// Logout route
GoogleRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = GoogleRouter;
