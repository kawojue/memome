import { Request, Response } from 'express'
import genRandom from '../utils/random.util'
import selectQuestion from '../utils/selectQuestion.util'
const expressAsyncHandler = require('express-async-handler')

const question = expressAsyncHandler(async (req: Request, res: Response) => {
    const { choice } = req.query
    const { questionType } = req.params

    const getQuestions = selectQuestion(questionType)
    const length = getQuestions.length

    if (!choice) {
        res.status(200).json({
            questions: getQuestions
        })
        return
    }

    if (choice == 'random') {
        res.status(200).json({
            question: genRandom(getQuestions)
        })
        return
    }

    if (!Number(choice)) {
        res.status(400).json({
            msg: 'Invalid Choice Made.'
        })
        return
    }

    res.status(200).json({
        question: getQuestions[
            Number(choice) > length ?
                length - 1 :
                Number(choice)
        ]
    })
})

export { question }