import prisma from '../prisma'
import jwt from 'jsonwebtoken'
import { sendError } from '../helpers/sendRes'
import StatusCodes from '../enums/StatusCodes'
import { Request, Response, NextFunction } from 'express'
const expressAsyncHandler = require('express-async-handler')

const verifyUser = expressAsyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const access_token = req.cookies?.access_token
    if (!access_token) {
        sendError(res, StatusCodes.Unauthorized, 'Access Denied.')
        return
    }

    jwt.verify(
        access_token,
        process.env.JWT_SECRET!,
        async (err: any, decoded: any) => {
            try {
                if (err) {
                    sendError(res, StatusCodes.Forbidden, 'Access Denied.')
                    return
                }

                if ((Date.now() / 1000) > decoded.exp) {
                    sendError(res, StatusCodes.Unauthorized, 'Access token expired.')
                    return
                }

                const user = await prisma.users.findUnique({
                    where: {
                        id: decoded.id
                    },
                    select: {
                        id: true
                    }
                })

                if (!user) {
                    sendError(res, StatusCodes.Forbidden, 'Access Denied.')
                    return
                }

                // @ts-ignore
                req.userId = user.id

                next()
            } catch {
                sendError(res, StatusCodes.Forbidden, 'Something went wrong.')
                return
            }
        }
    )
})

export default verifyUser