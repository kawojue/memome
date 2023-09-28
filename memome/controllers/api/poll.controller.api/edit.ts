import prisma from '../../../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const edit = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId
    const { pollId, type } = req.params

    const poll = await prisma.poll.findUnique({
        where: {
            id: pollId,
            createdById: userId
        },
    })

    if (!poll) {
        sendError(res, StatusCodes.NotFound, 'Poll not found.')
        return
    }

    switch (type) {
        case 'active':
            await prisma.poll.update({
                where: {
                    id: pollId,
                    createdById: userId
                },
                data: {
                    active: !poll.active
                }
            })
            break
        case 'visiblity':
            await prisma.poll.update({
                where: {
                    id: pollId,
                    createdById: userId
                },
                data: {
                    private: !poll.private
                }
            })
            break
        default:
            break
    }

    sendSuccess(res, StatusCodes.OK)
})

const editExpiry = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId
    const { date } = req.body
    const { pollId } = req.params

    if (!date) {
        sendError(res, StatusCodes.BadRequest, 'Invalid Date.')
        return
    }

    const poll = await prisma.poll.findUnique({
        where: {
            id: pollId,
            createdById: userId,
        }
    })

    if (!poll) {
        sendError(res, StatusCodes.NotFound, 'Poll not found.')
        return
    }

    const getDate = new Date(date)

    if (getDate < new Date()) {
        sendError(res, StatusCodes.BadRequest, 'Invalid Expiry Date.')
        return
    }

    await prisma.poll.update({
        where: {
            id: pollId,
            createdById: userId,
        },
        data: {
            expiry: date
        }
    })

    sendSuccess(res, StatusCodes.OK)
})

export { edit, editExpiry }