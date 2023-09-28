import bcrypt from 'bcrypt'
import prisma from '../../prisma'
import { Request, Response } from 'express'
import { USER_REGEX } from '../../utils/RegExp'
import StatusCodes from '../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../helpers/sendRes'


const account = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        },
        select: {
            Profile: true,
            Account: true,
            username: true,
            auth_method: true,
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'Something went wrong.')
        return
    }

    sendSuccess(res, StatusCodes.OK, { user })
})

const editUsername = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const user = req.userId
    const username = req.body?.username?.toLowerCase()?.trim()

    if (!username || !USER_REGEX.test(username)) {
        sendError(res, StatusCodes.BadRequest, 'Username not allowed.')
        return
    }

    const userExists = await prisma.users.findUnique({
        where: { username }
    })

    if (userExists) {
        sendError(res, StatusCodes.BadRequest, 'Username has been taken.')
        return
    }

    try {
        await prisma.users.update({
            where: {
                id: user
            },
            data: { username }
        })
    } catch {
        sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
        return
    }

    sendSuccess(res, StatusCodes.OK, {
        msg: 'Successful.',
        username
    })
})

const editDisability = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId

    const account = await prisma.accounts.findUnique({
        where: { userId },
    })

    await prisma.accounts.update({
        where: { userId },
        data: {
            disabled: !account?.disabled
        }
    })

    sendSuccess(res, StatusCodes.OK)
})

const editPswd = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId
    const { pswd, password, password2 } = req.body

    if (!pswd || !password || !password2) {
        sendError(res, StatusCodes.BadRequest, 'All fields are required.')
        return
    }

    if (password !== password2) {
        sendError(res, StatusCodes.BadRequest, 'Passwords not match.')
        return
    }

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'Account not found.')
        return
    }

    const authMethod = user.auth_method
    if (!user.password) {
        sendError(
            res,
            StatusCodes.BadRequest,
            `Password cannot be edited. You signed in with ${authMethod}.`
        )
        return
    }

    const isMatch: boolean = await bcrypt.compare(pswd, user.password)
    if (!isMatch) {
        sendError(res, StatusCodes.Unauthorized, 'Current password is incorrect.')
        return
    }

    await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            password: await bcrypt.hash(password, 10)
        }
    })

    sendSuccess(res, StatusCodes.OK, { msg: 'Password successfully updated.' })
})

export default account
export { editUsername, editDisability, editPswd }