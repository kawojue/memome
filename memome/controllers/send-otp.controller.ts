import prisma from '../prisma'
import generateOTP from '../utils/genOTP'
import { Request, Response } from 'express'
import { EMAIL_REGEX } from '../utils/RegExp'
import StatusCodes from '../enums/StatusCodes'
import sendOTP from '../services/send-otp.mail'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../helpers/sendRes'

const sendOtp = expressAsyncHandler(async (req: Request, res: Response) => {
    let { email } = req.body
    email = email?.toLowerCase()?.trim()

    if (!email || !EMAIL_REGEX.test(email)) {
        sendError(res, StatusCodes.BadRequest, 'Invalid email.')
        return
    }

    const user = await prisma.users.findUnique({
        where: { email }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'Account does not exist.')
        return
    }

    if (user.auth_method !== 'local') {
        sendError(res, StatusCodes.BadRequest, `Account exists. Login with other provider.`)
        return
    }

    if (user.totp_expiry) {
        if (new Date().getTime() < new Date(user.totp_expiry).getTime()) {
            sendError(res, StatusCodes.BadRequest, 'Request after 30 minutes.')
            return
        }
    }

    const { totp, totp_expiry } = generateOTP()

    if (process.env.NODE_ENV === 'production') {
        await sendOTP(totp, email)
    } else {
        console.log({ totp, totp_expiry })
    }

    await prisma.users.update({
        where: { email },
        data: { totp, totp_expiry }
    })

    sendSuccess(res, StatusCodes.OK, {
        msg: 'An OTP code has been sent to your email.'
    })
})

export { sendOtp }