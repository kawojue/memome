import { Router } from 'express'
import account, {
    editDisability, editUsername, editPswd
} from '../../controllers/api/account.api'

const router: Router = Router()

router.get('/', account)
router.patch('/reset-pswd', editPswd)
router.get('/disable', editDisability)
router.patch('/username', editUsername)

export default router