import { Request, Response } from 'express'
import StatusCodes from '../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../helpers/sendRes'

const isAuth = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId

    if (!userId) {
        sendError(res, StatusCodes.Forbidden)
        return
    }

    sendSuccess(res, StatusCodes.OK)
})

export { isAuth }