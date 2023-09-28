import prisma from '../prisma'
import { deleteS3 } from '../helpers/s3'
import { Request, Response } from 'express'
import StatusCodes from '../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../helpers/sendRes'

const deleteAccount = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId
    const { username } = req.body

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        },
        include: {
            Account: true,
            Profile: true,
            Settings: true,
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'Account not found.')
        return
    }

    if (user.username !== username) {
        sendError(res, StatusCodes.Unauthorized, 'Cannot delete! Username is incorrect.')
        return
    }

    const profile = user.Profile
    const avatar_path = profile?.avatar?.path

    if (avatar_path) {
        try {
            await deleteS3(avatar_path)
        } catch {
            sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
            return
        }
    }

    const messages = await prisma.message.findMany({
        where: { userId }
    })

    for (const message of messages) {
        const msg_files = message.files
        if (msg_files.length > 0) {
            for (const msg_file of msg_files) {
                try {
                    await deleteS3(msg_file.path)
                } catch {
                    sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
                    return
                }
            }
        }
    }

    const polls = await prisma.poll.findMany({
        where: {
            createdById: userId
        },
        include: {
            options: {
                include: {
                    votes: true
                }
            },
        }
    })

    for (const poll of polls) {
        const poll_files = poll.files
        const poll_options = poll.options

        if (poll_files.length > 0) {
            for (const poll_file of poll_files) {
                try {
                    await deleteS3(poll_file.path)
                } catch {
                    sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
                    return
                }
            }
        }

        for (const poll_option of poll_options) {
            await prisma.vote.deleteMany({
                where: {
                    optionId: poll_option.id
                }
            })
        }

        await prisma.option.deleteMany({
            where: {
                pollId: poll.id
            }
        })
    }

    await prisma.message.deleteMany({
        where: { userId }
    })

    await prisma.poll.deleteMany({
        where: {
            createdById: userId
        }
    })

    await prisma.profiles.delete({
        where: { userId }
    })

    await prisma.settings.delete({
        where: { userId }
    })

    await prisma.accounts.delete({
        where: { userId }
    })

    await prisma.users.delete({
        where: {
            id: userId
        }
    })

    sendSuccess(res, StatusCodes.OK)
})

export default deleteAccount