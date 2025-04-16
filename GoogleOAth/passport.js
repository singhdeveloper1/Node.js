import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"


passport.use(new GoogleStrategy({
    clientID : process.env.Google_Client_ID,
    clientSecret : process.env.Google_Client_Secret, 
    callbackURL : "/auth/google/callback"
},(accessToken, refreshToken, profile, done)=>{
    // console.log("google Profile", profile)
    return done(null, profile)
}))

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((obj, done)=>{
    done(null, obj)
})

export default passport