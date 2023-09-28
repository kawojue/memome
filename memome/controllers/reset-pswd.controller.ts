import bcrypt from 'bcrypt'
import prisma from '../prisma'
import { OTPAction } from '../type'
import { Request, Response } from 'express'
import StatusCodes from '../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../helpers/sendRes'

const resetOTP = async (email: string, action: OTPAction) => {
    await prisma.users.update({
        where: { email },
        data: {
            totp: null,
            totp_expiry: null,
            refresh_token: action === 'denied' ? undefined : '',
            email_verified: action === 'granted' ? true : undefined
        }
    })
}

const verify = expressAsyncHandler(async (req: Request, res: Response) => {
    const { otp, password, password2 } = req.body

    if (!otp || !password || !password2) {
        sendError(res, StatusCodes.BadRequest, 'Invalid credentials provided.')
        return
    }

    const user = await prisma.users.findFirst({
        where: {
            totp: otp
        }
    })

    if (!user || otp !== user?.totp) {
        sendError(res, StatusCodes.Unauthorized, 'Incorrect OTP.')
        return
    }

    if (user.auth_method !== "local") {
        sendError(res, StatusCodes.Unauthorized, 'Login with other providers.')
        return
    }

    if (password !== password2) {
        sendError(res, StatusCodes.BadRequest, 'Passwords not match.')
        return
    }

    if (password.length < 7) {
        sendError(res, StatusCodes.BadRequest, 'Password too short.')
        return
    }

    const now = Date.now()
    const totp_expiry = user.totp_expiry || 0

    if (now > totp_expiry) {
        await resetOTP(user.email, 'denied')
        sendError(res, StatusCodes.BadRequest, 'The OTP you provided has expired.')
        return
    }

    await prisma.users.update({
        where: {
            email: user.email
        },
        data: {
            password: await bcrypt.hash(password, 10)
        }
    })
    await resetOTP(user.email, 'granted')

    sendSuccess(res, StatusCodes.OK, {
        msg: 'Password reset was successful.'
    })
})

export { verify }