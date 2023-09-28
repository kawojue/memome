import jwt from 'jsonwebtoken'
import prisma from '../../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../helpers/sendRes'


const userProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params

    let token = ''
    let authUser: any
    let isAuthenticated = false

    const authHeader = req.headers?.authorization
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]
    }

    const user = await prisma.users.findUnique({
        where: { username },
        select: {
            id: true,
            Profile: true,
            Account: true,
            Settings: true,
            username: true,
            email_verified: true,
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'User not found.')
        return
    }

    if (user.Account?.disabled) {
        sendError(res, StatusCodes.Unauthorized, 'Account has been disabled.')
        return
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET!,
        async (err: any, decoded: any) => {
            if (err) {
                isAuthenticated = false
            }
            if (decoded?.id !== user.id) {
                try {
                    await prisma.profiles.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            views: {
                                increment: 1
                            },
                            msg_point: {
                                increment: 0.15
                            },
                            poll_point: {
                                increment: 0.15
                            }
                        }
                    })

                    authUser = await prisma.users.findUnique({
                        where: {
                            id: decoded?.id
                        },
                        select: {
                            Profile: true,
                            username: true,
                        }
                    })
                    isAuthenticated = true
                } catch {
                    isAuthenticated = false
                }
            }
            sendSuccess(res, StatusCodes.OK, {
                user,
                authUser: { ...authUser, isAuthenticated }
            })
        }
    )
})

export default userProfile