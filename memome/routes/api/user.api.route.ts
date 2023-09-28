import { Router } from 'express'
import userProfile from '../../controllers/api/user.api'
import limit from '../../middlewares/limiter.middleware'

const router: Router = Router()

router.get('/:username', limit({
    max: 1,
    timerArr: [14, 19, 15],
    msg: 'Denied by Cheat System.'
}), userProfile)

export default router