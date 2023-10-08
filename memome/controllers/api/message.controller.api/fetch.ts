import jwt from 'jsonwebtoken'
import prisma from '../../../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { enc_decrypt } from '../../../helpers/enc_decrypt'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const fetchMsg = expressAsyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    let { page = 1, limit = 10 } = req.query

    let token = ''
    let isAuthenticated = false

    page = Number(page)
    limit = Number(limit)
    const offset = (page - 1) * limit

    const authHeader = req.headers?.authorization
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]
    }

    let user = await prisma.users.findUnique({
        where: {
            username: userId,
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'User not found.')
        return
    }

    let messages = await prisma.message.findMany({
        where: {
            userId: user.id,
        },
        skip: offset,
        take: limit,
        orderBy: {
            date: 'desc'
        }
    })

    let totalMessagesCount = await prisma.message.count({
        where: {
            userId: user.id
        }
    })

    jwt.verify(
        token,
        process.env.JWT_SECRET!,
        (err: any, decoded: any) => {
            if (decoded?.id === user?.id) {
                isAuthenticated = true
            }
        }
    )

    if (isAuthenticated === false) {
        messages = await prisma.message.findMany({
            where: {
                userId: user.id,
                private: false
            },
            skip: offset,
            take: limit,
            orderBy: {
                date: 'desc'
            }
        })

        totalMessagesCount = await prisma.message.count({
            where: {
                userId: user.id,
                private: false,
            }
        })
    }

    const decrytedMsgs = await Promise.all(messages.map(async (message) => {
        if (message.texts) {
            return {
                ...message,
                texts: await enc_decrypt(message.texts, 'd')
            }
        }
        return message
    }))

    sendSuccess(res, StatusCodes.OK, {
        messages: decrytedMsgs,
        length: totalMessagesCount,
        isAuthenticated
    })
})

export default fetchMsg