import { Router } from 'express'
import settings, {
    messageType, toggles
} from '../../controllers/api/settings.api'

const router: Router = Router()

router.get('/', settings)
router.get('/msg-type', messageType)
router.get('/toggle/:type', toggles)

export default router