import prisma from '../../../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const vote = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const voterId = req.userId
    const { pollId, optionId, createdById } = req.params

    const poll = await prisma.poll.findUnique({
        where: {
            id: pollId,
        }
    })

    const option = await prisma.option.findUnique({
        where: {
            pollId,
            id: optionId
        }
    })

    if (!poll || !option) {
        sendError(res, StatusCodes.NotFound, 'Poll or option not found.')
        return
    }

    if (!poll.active) {
        sendError(res, StatusCodes.Unauthorized, 'Poll is inactive.')
        return
    }

    if (poll.expiry) {
        const pollExpiry = new Date(poll.expiry)
        if (pollExpiry < new Date()) {
            sendError(res, StatusCodes.Unauthorized, 'Poll has expired.')
            return
        }
    }

    const voted = await prisma.vote.findUnique({
        where: {
            userId_pollId: {
                pollId,
                userId: voterId
            },
        }
    })

    if (voted) {
        sendError(res, StatusCodes.BadRequest, 'Already voted.')
        return
    }

    const newVote = await prisma.vote.create({
        data: {
            user: {
                connect: {
                    id: voterId
                }
            },
            poll: {
                connect: {
                    id: pollId
                }
            },
            option: {
                connect: {
                    id: optionId
                }
            }
        }
    })

    await prisma.poll.update({
        where: {
            id: pollId,
        },
        data: {
            totalVotes: {
                increment: 1
            }
        }
    })

    await prisma.option.update({
        where: {
            pollId,
            id: optionId
        },
        data: {
            totalVotes: {
                increment: 1
            },
            votes: {
                connect: {
                    id: newVote.id
                }
            }
        }
    })

    await prisma.profiles.update({
        where: {
            userId: createdById
        },
        data: {
            poll_point: {
                increment: 0.08
            }
        }
    })

    await prisma.profiles.update({
        where: {
            userId: voterId
        },
        data: {
            poll_point: {
                increment: 0.1
            }
        }
    })

    const updatedPoll = await prisma.poll.findUnique({
        where: {
            id: poll.id,
            createdById
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

    sendSuccess(res, StatusCodes.OK, {
        poll: {
            ...updatedPoll,
            hasVoted: newVote.optionId === optionId,
            votedOption: newVote ? newVote.optionId : null
        }
    })
})

export { vote }