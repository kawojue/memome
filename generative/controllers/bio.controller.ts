import { biosArray } from '../db/bios/bio'
import { Request, Response } from 'express'
import genRandom from '../utils/random.util'
const expressAsyncHandler = require('express-async-handler')

const bios = expressAsyncHandler(async (req: Request, res: Response) => {
    const { choice } = req.query

    const length = biosArray.length

    if (!choice || choice === 'all') {
        res.status(200).json({
            bios: biosArray
        })
        return
    }

    if (choice == 'random') {
        res.status(200).json({
            bio: genRandom(biosArray)
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
        bio: biosArray[
            Number(choice) > length ?
                length - 1 :
                Number(choice)
        ]
    })
})

export { bios }