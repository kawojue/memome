import { Router, Response, Request } from 'express'
import { bios } from '../controllers/bio.controller'
import { levels } from '../controllers/level.controller'
import { question } from '../controllers/question.controller'

const root: Router = Router()

root.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'MemoMe Generators'
    })
})
root.get('/bios', bios)
root.get('/levels/:levelType', levels)
root.get('/questions/:questionType', question)

export default root