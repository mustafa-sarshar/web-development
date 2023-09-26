const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20");

const googleStrategyOptions = {
  callbackURL: process.env["OAUTH_REDIRECT_URI"],
  clientID: process.env["OAUTH_SERVICE_CLIENT_ID"],
  clientSecret: process.env["OAUTH_SERVICE_CLIENT_SECRET"],
};
passport.use(
  new GoogleStrategy(
    googleStrategyOptions,
    (accessToken, refreshToken, profile, done) => {
      console.log("ACCESS_TOKEN", accessToken);
      console.log("REFRESH_TOKEN", refreshToken);
      console.log("PROFILE", profile);
    }
  )
);
