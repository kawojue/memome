import prisma from '../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'

const clear = (req: Request, res: Response) => {
    const isProd = process.env.NODE_ENV === 'production'

    const cookieNames = Object.keys(req.cookies)
    for (const cookie of cookieNames) {
        res.clearCookie(cookie, {
            domain: isProd ? 'memome.online' : undefined,
            secure: isProd,
            sameSite: isProd ? 'none' : 'strict',
        })
    }

    res.sendStatus(StatusCodes.NoContent)
}

const logout = expressAsyncHandler(async (req: Request, res: Response) => {
    const refresh_token = req.cookies?.refresh_token
    if (!refresh_token) {
        return clear(req, res)
    }

    const user = await prisma.users.findFirst({
        where: { refresh_token }
    })

    if (!user) return clear(req, res)

    await prisma.users.update({
        where: {
            username: user.username
        },
        data: {
            refresh_token: null,
            last_logout: new Date().toISOString()
        }
    })

    clear(req, res)
})

export { logout }