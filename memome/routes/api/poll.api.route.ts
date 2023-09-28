import { Router } from 'express'
import upload from '../../middlewares/upload.middleware'
import limit from '../../middlewares/limiter.middleware'
import verifyUser from '../../middlewares/verifyUser.middleware'
import { vote } from '../../controllers/api/poll.controller.api/vote'
import { poll } from '../../controllers/api/poll.controller.api/poll'
import { voter } from '../../controllers/api/poll.controller.api/voter'
import { create } from '../../controllers/api/poll.controller.api/create'
import fetchUserPolls from '../../controllers/api/poll.controller.api/fetch'
import { deletePoll } from '../../controllers/api/poll.controller.api/delete'
import { edit, editExpiry } from '../../controllers/api/poll.controller.api/edit'

const router: Router = Router()

router.get(
    '/get/:createdById/:pollId',
    limit({
        max: 1,
        timerArr: [14, 9, 12],
        msg: 'Denied by Cheat System.'
    }),
    poll
)

router.use(verifyUser)

router.post(
    '/create',
    upload.array('poll_files', 4),
    create
)

router.get('/voter', voter)

router.delete('/delete/:pollId', deletePoll)

router.get('/fetch/:username', fetchUserPolls)

router.patch('/edit/toggle/:pollId/:type', edit)

router.post('/edit/expiry/:pollId/', editExpiry)

router.post('/vote/:createdById/:pollId/:optionId', vote)


export default router