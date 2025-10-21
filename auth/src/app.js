import express from "express"
import authRoutes from './routes/auth.routes.js'
import morgan from "morgan"
import cookieParser from "cookie-parser"
import passport from 'passport'
import{ Strategy as  GoogleStrategy} from 'passport-google-oauth20'
import config from '../src/config/config.js'
const app = express()
 
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
 
app.use(passport.initialize());
// Configure Passport to use Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
     callbackURL: '/api/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // Here, you would typically find or create a user in your database
    // For this example, we'll just return the profile
    return done(null, profile); 
  }));
  

app.use('/api/auth',authRoutes)
export default app