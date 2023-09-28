import { Router } from 'express'
import profile, {
    changeAvatar, deleteAvatar, editBio
} from '../../controllers/api/profile.api'
import accountRoutes from './account.api.route'
import settingsRoutes from './settings.api.route'
import upload from '../../middlewares/upload.middleware'
import verifyUser from '../../middlewares/verifyUser.middleware'

const router: Router = Router()

router.use(verifyUser)

router.use('/account', accountRoutes)
router.use('/settings', settingsRoutes)

router.get('/profile', profile)

router.route(
    '/avatar'
).post(
    upload.single('avatar'),
    changeAvatar
).delete(deleteAvatar)

router.patch('/bio', editBio)

export default router