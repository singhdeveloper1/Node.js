import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import Google from "./models/google.model.js"


passport.use(new GoogleStrategy({
    clientID : process.env.Google_Client_ID, 
    clientSecret : process.env.Google_Client_Secret,
    callbackURL : "auth/google/callback"
},
async (accessToken, refreshToken, profile, done)=>{
    try {
        const existingUser = await Google.findOne({email : profile.emails[0].value})
        if(existingUser){
            return done(null , existingUser)
        }

        const newUser = new Google({
            googleId : profile.id,
            name : profile.displayName,
            email : profile.emails[0].value
        })

        await newUser.save()

        done(null, newUser)

    } catch (error) {
        done(error, null)
    }
}
))

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=>{
    try {
        const user = await Google.findById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})

export default passport 