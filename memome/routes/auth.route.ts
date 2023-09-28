import { Router, } from 'express'
import { githubAuth } from '../controllers/github/'
import { isAuth } from '../controllers/api/auth.api'
import limit from '../middlewares/limiter.middleware'
import { login } from '../controllers/login.controller'
import { signup } from '../controllers/signup.controller'
import { logout } from '../controllers/logout.controller'
import { sendOtp } from '../controllers/send-otp.controller'
import refreshToken from '../controllers/refresh.controller'
import deleteAccount from '../controllers/delete.controller'
import { verify } from '../controllers/reset-pswd.controller'
import verifyUser from '../middlewares/verifyUser.middleware'
import { passport } from '../controllers/google/callback.google'
import { githubAuthCallback } from '../controllers/github/callback.github'

const router: Router = Router()

const { CLIENT_URL } = process.env


// local sign in
router.post('/login', limit({
    max: 5,
    timerArr: [90, 60, 45, 75],
    msg: 'Too many attempts. Try again later.'
}), login)
router.post('/signup', signup)

router.get('/logout', logout)
router.post('/refresh', refreshToken)


// Google sign in
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
)
router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${CLIENT_URL!}/login`,
        successRedirect: `${CLIENT_URL!}/profile`,
    })
)


// Github sign in
router.get('/github', githubAuth)
router.get('/github/callback', githubAuthCallback)


// Password reset
router.post('/verify', limit({
    max: 4,
    timerArr: [30 * 60],
    msg: 'Too many attempts! Try again in 30mins..'
}), verify)
router.post('/req-otp', limit({
    max: 2,
    timerArr: [30 * 60],
    msg: 'Try again later..'
}), sendOtp)

router.use(verifyUser)

router.get('/isAuth', isAuth)
router.post('/delete', deleteAccount)

export default router