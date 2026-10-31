import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config.js";
import authModel from "../modules/auth.module.js";



passport.use(
  
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await authModel.findOne({
          googleId: profile.id,
        });

        const email = profile.emails?.[0]?.value;

        if (!user && email) {
          user = await authModel.findOne({ email });
        }

        if (!user) {
          user = await authModel.create({
            name: profile.displayName,
            googleId: profile.id,
            email,
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;