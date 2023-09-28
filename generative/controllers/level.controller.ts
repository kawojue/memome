
import { Level } from '../type'
import { Request, Response } from 'express'
import selectLevel from '../utils/selectLevel.util'
import calculateLevel from '../utils/calcLevel.util'
const expressAsyncHandler = require('express-async-handler')

const levels = expressAsyncHandler(async (req: Request, res: Response) => {
    const { point } = req.query
    const { levelType } = req.params

    if (!point || !Number(point) || !levelType) {
        return res.sendStatus(400)
    }

    const selectedLevel: Level[] = selectLevel(levelType)
    const getLevel: string = calculateLevel(selectedLevel, Number(point))

    res.status(200).json({
        level: getLevel
    })
})

export { levels }