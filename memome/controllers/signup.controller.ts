import bcrypt from 'bcrypt'
import prisma from '../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../enums/StatusCodes'
import welcome from '../services/welcome.mail'
import { getIpAddress } from '../utils/getIpAddress'
import { enc_decrypt } from '../helpers/enc_decrypt'
import connectModels from '../helpers/connect-models'
import expressAsyncHandler from 'express-async-handler'
import { USER_REGEX, EMAIL_REGEX } from '../utils/RegExp'
import { sendError, sendSuccess } from '../helpers/sendRes'
import { generateUsername } from 'unique-username-generator'

const signup = expressAsyncHandler(async (req: Request, res: Response) => {
    let { email, password, password2 } = req.body
    email = email?.trim()?.toLowerCase()

    if (!email || !password || !password2) {
        sendError(res, StatusCodes.BadRequest, 'All fields are required.')
        return
    }

    if (password !== password2) {
        sendError(res, StatusCodes.BadRequest, 'Passwords not match.')
        return
    }

    if (password.length < 7) {
        sendError(res, StatusCodes.BadRequest, 'Your password must have at least 7 characters.')
        return
    }

    if (!EMAIL_REGEX.test(email)) {
        sendError(res, StatusCodes.BadRequest, 'Invalid email.')
        return
    }

    const userExists = await prisma.users.findUnique({
        where: { email }
    })

    if (userExists) {
        sendError(res, StatusCodes.Conflict, 'Account already exists.')
        return
    }

    let username: string = email.split('@')[0]

    const usernameTaken = await prisma.users.findUnique({
        where: { username }
    })

    if (!USER_REGEX.test(username) || usernameTaken) {
        username = generateUsername("", 0, 32) // no delimiter, 0 to 32 max
    }

    password = await bcrypt.hash(password, 10)
    const userAgent = req.headers['user-agent'] || ''

    const newUser = await prisma.users.create({
        data: {
            email,
            password,
            username,
            auth_method: 'local',
            user_agent: await enc_decrypt(userAgent, 'e')
        }
    })

    await connectModels(newUser.id)

    process.env.NODE_ENV === "production" &&
        await welcome(newUser.username, newUser.email)

    sendSuccess(res, StatusCodes.Created, {
        msg: 'Account creation was successful.'
    })
})

export { signup }