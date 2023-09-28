import jwt from 'jsonwebtoken'
import prisma from '../../../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const poll = expressAsyncHandler(async (req: Request, res: Response) => {
    let token = ''
    let decoded: any
    const { pollId, createdById } = req.params

    const authHeader = req.headers?.authorization
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]
    }

    if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET!)
    }

    const userId = decoded?.id

    const user = await prisma.users.findUnique({
        where: {
            id: createdById
        },
        select: {
            username: true,
            Account: {
                select: {
                    disabled: true,
                    verified: true
                }
            },
            Profile: {
                select: {
                    bio: true,
                    avatar: true
                }
            }
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'User not found.')
        return
    }

    if (user.Account?.disabled) {
        sendError(res, StatusCodes.NotFound, 'Account has been disabled by User.')
        return
    }

    const ids: string[] = [createdById, userId]

    if (userId && userId !== createdById) {
        for (const idx of ids) {
            await prisma.profiles.update({
                where: {
                    userId: idx
                },
                data: {
                    poll_point: {
                        increment: 0.015
                    }
                }
            })
        }
    }

    const pollVotes = await prisma.poll.findUnique({
        where: {
            id: pollId,
        },
        select: {
            votes: {
                where: { userId },
                select: {
                    userId: true,
                    optionId: true
                },
            },
        },
    })

    const outputPoll = await prisma.poll.findUnique({
        where: {
            id: pollId,
        },
        include: {
            options: {
                select: {
                    id: true,
                    texts: true,
                    totalVotes: true,
                },
            },
        },
    })

    if (!pollVotes || !outputPoll) {
        sendError(res, StatusCodes.NotFound, 'Poll not found.')
        return
    }

    await prisma.poll.update({
        where: {
            id: pollId
        },
        data: {
            views: {
                increment: 1
            },
        }
    })

    const hasVoted = pollVotes.votes.some((vote) => vote.userId === userId)
    const votedOption = hasVoted ? pollVotes.votes[0].optionId : null

    sendSuccess(res, StatusCodes.OK, {
        user,
        poll: { ...outputPoll, hasVoted, votedOption },
    })
})

export { poll }