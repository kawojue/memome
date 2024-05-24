import googleAuth from '.'
import {
    Strategy as GoogleStrategy
} from 'passport-google-oauth2'
import passport from 'passport'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

passport.use(
    new GoogleStrategy(
        {
            passReqToCallback: true,
            scope: ['profile', 'email'],
            clientID: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!,
            callbackURL: '/auth/google/callback',
        },
        googleAuth
    )
)

passport.serializeUser((user: any, done: any) => {
    done(null, user.id)
})

passport.deserializeUser((user: any, done: any) => {
    try {
        done(null, { id: user.id })
    } catch (err) {
        done(err, null)
    }
})

export { passport }