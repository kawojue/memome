import prisma from '../../../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const editMsgVisibility = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId
    const { msgId } = req.params

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'Something went wrong.')
        return
    }

    const message = await prisma.message.findUnique({
        where: {
            userId,
            id: msgId
        },
    })

    if (!message) {
        sendError(res, StatusCodes.NotFound, 'Message not found.')
        return
    }

    await prisma.message.update({
        where: {
            userId,
            id: msgId
        },
        data: {
            private: !message.private
        }
    })

    sendSuccess(res, StatusCodes.OK, {
        msg: 'Message visibility changed.'
    })
})

export default editMsgVisibility