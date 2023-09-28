import bcrypt from 'bcrypt'
import prisma from '../prisma'
import genTokens from '../utils/genTokens'
import { Request, Response } from 'express'
import { EMAIL_REGEX } from '../utils/RegExp'
import StatusCodes from '../enums/StatusCodes'
import newLogin from '../services/new-login.mail'
import { enc_decrypt } from '../helpers/enc_decrypt'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../helpers/sendRes'

const login = expressAsyncHandler(async (req: Request, res: Response) => {
    let { userId, password } = req.body
    userId = userId?.trim()?.toLowerCase()

    if (!userId || !password) {
        sendError(res, StatusCodes.BadRequest, 'All fields are required.')
        return
    }

    const user = EMAIL_REGEX.test(userId) ? await prisma.users.findUnique({
        where: { email: userId }
    }) : await prisma.users.findUnique({
        where: { username: userId }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'Invalid User ID or Password.')
        return
    }

    if (!user.password) {
        sendError(res, StatusCodes.NotFound, 'Sign in with other Providers.')
        return
    }

    const match: boolean = await bcrypt.compare(password, user.password!)
    if (!match) {
        sendError(res, StatusCodes.Unauthorized, 'Incorrect password.')
        return
    }

    const isProd: boolean = process.env.NODE_ENV === "production"

    const userAgent = req.headers['user-agent']
    const ipAddress: string | undefined = req.socket.remoteAddress?.split(":")[3]

    await prisma.users.update({
        where: { id: user.id },
        data: {
            ip_address: await enc_decrypt(ipAddress!, 'e'),
            last_login: new Date().toISOString()
        }
    })

    await genTokens(res, user.id)

    if (await enc_decrypt(user.ip_address!, 'd') !== ipAddress) {
        isProd && await newLogin(user.email, user.username, userAgent!, ipAddress!)
    }

    sendSuccess(res, StatusCodes.OK, {
        msg: 'Login successful.',
    })
})

export { login }