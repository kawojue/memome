import prisma from '../../../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'

const voter = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId

    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        },
        select: {
            username: true,
            Profile: {
                select: {
                    bio: true,
                    avatar: true,
                }
            }
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'User not found.')
        return
    }

    sendSuccess(res, StatusCodes.OK, {
        voter: { ...user, isAuthenticated: true }
    })
})

export { voter }