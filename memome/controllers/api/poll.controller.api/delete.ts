import prisma from '../../../prisma'
import { Request, Response } from 'express'
import { deleteS3 } from '../../../helpers/s3'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const deletePoll = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId
    const { pollId } = req.params

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        }
    })

    const poll = await prisma.poll.findUnique({
        where: {
            id: pollId,
            createdById: userId,
        },
        include: {
            options: {
                include: {
                    votes: true
                }
            },
        }
    })

    if (!user || !poll) {
        sendError(res, StatusCodes.NotFound, 'Poll not found.')
        return
    }

    const files = poll.files
    const options = poll.options

    try {
        if (files.length > 0) {
            for (const file of files) {
                await deleteS3(file.path)
            }
        }

        for (const option of options) {
            await prisma.vote.deleteMany({
                where: {
                    optionId: option.id
                }
            })
        }

        await prisma.option.deleteMany({
            where: { pollId }
        })
    } catch {
        sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
        return
    }

    await prisma.profiles.update({
        where: { userId },
        data: {
            poll_point: {
                decrement: files.length > 0 ? 0.75 : 0.6
            }
        }
    })

    await prisma.poll.delete({
        where: {
            id: pollId,
            createdById: userId,
        }
    })

    sendSuccess(res, StatusCodes.OK)
})

export { deletePoll }