import prisma from '../../../prisma'
import { Request, Response } from 'express'
import { deleteS3 } from '../../../helpers/s3'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const deleteMessage = expressAsyncHandler(async (req: Request, res: Response) => {
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

    const files = message.files
    if (files.length > 0) {
        files.forEach(async (file) => {
            try {
                await deleteS3(file.path)
            } catch {
                sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
                return
            }
        })
    }

    await prisma.profiles.update({
        where: { userId },
        data: {
            msg_point: {
                decrement: files.length > 0 ? 0.5 : 0.4
            }
        }
    })

    await prisma.message.delete({
        where: {
            userId,
            id: msgId
        },
    })

    sendSuccess(res, StatusCodes.OK, {
        msg: 'Message deleted successfully.'
    })
})

export default deleteMessage