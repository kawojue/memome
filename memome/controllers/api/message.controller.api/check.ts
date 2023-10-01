import jwt from 'jsonwebtoken'
import prisma from '../../../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const increment = async (username: string) => {
    await prisma.users.update({
        where: { username },
        data: {
            Profile: {
                update: {
                    views: {
                        increment: 1
                    },
                    msg_point: {
                        increment: 0.05
                    }
                }
            }
        }
    })
}

const checkUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params
    let isAuthenticated = false
    let token = ''

    const authHeader = req.headers?.authorization
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]
    }

    const user = await prisma.users.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            Profile: {
                select: {
                    bio: true,
                    avatar: true,
                },
            },
            Account: {
                select: {
                    verified: true,
                    disabled: true,
                }
            },
            Settings: {
                select: {
                    allow_files: true,
                    allow_texts: true,
                    gen_msg_type: true,
                }
            },
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'User not found.')
        return
    }

    if (user.Account?.disabled) {
        sendError(res, StatusCodes.Unauthorized, 'Account has been disbled by user.')
        return
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET!,
        (err: any, decoded: any) => {
            if (decoded?.id === user.id) {
                isAuthenticated = true
            }
        }
    )

    if (!isAuthenticated) {
        await increment(user.username)
    }

    const output = {
        isAuthenticated,
        bio: user.Profile?.bio,
        username: user.username,
        avatar: user.Profile?.avatar,
        verified: user.Account?.verified,
        msg_type: user.Settings?.gen_msg_type,
        allowTexts: user.Settings?.allow_texts,
        allowFiles: user.Settings?.allow_files,
    }

    sendSuccess(res, StatusCodes.OK, { user: output })
})

export default checkUser