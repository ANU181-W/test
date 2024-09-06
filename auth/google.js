const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const User = require("../user/model");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:3002/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract user data from Google profile
        const { displayName, emails, photos } = profile;
        const email = emails[0].value;
        const profilePhoto = photos[0].value;

        // Check if the user already exists
        let user = await User.findOne({ where: { email } });

        if (user) {
          // If the user exists, update profile photo if necessary
          if (user.profilePhoto !== profilePhoto) {
            user.profilePhoto = profilePhoto;
            await user.save();
          }
        } else {
          // If the user doesn't exist, create a new one
          user = await User.create({
            name: displayName,
            email: email,
            profilePhoto: profilePhoto,
            password: bcrypt.hashSync("google", 10), // Placeholder password
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// Serialize and deserialize user to manage sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
