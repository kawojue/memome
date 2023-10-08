import prisma from '../../../prisma'
import { Request, Response } from 'express'
import StatusCodes from '../../../enums/StatusCodes'
import expressAsyncHandler from 'express-async-handler'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const fetchUserPolls = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId
    const { username } = req.params
    let { page = 1, limit = 5 } = req.query

    page = Number(page)
    limit = Number(limit)
    const offset = (page - 1) * limit
    let isAuthenticated = true

    let createdBy = await prisma.users.findUnique({
        where: { username }
    })

    if (!createdBy) {
        sendError(res, StatusCodes.NotFound, 'User not found.')
        return
    }

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, `Something went wrong. Login to see user's polls.`)
        return
    }

    let polls = await prisma.poll.findMany({
        where: {
            createdById: createdBy.id,
        },
        skip: offset,
        take: limit,
        include: {
            options: {
                select: {
                    id: true,
                    texts: true,
                    totalVotes: true
                }
            },
            votes: {
                where: {
                    userId: user.id,
                },
                select: {
                    optionId: true,
                }
            }
        },
        orderBy: {
            date: 'desc'
        }
    })

    let totalPollsCount = await prisma.poll.count({
        where: {
            createdById: createdBy.id
        }
    })

    if (createdBy.id !== user.id) {
        polls = await prisma.poll.findMany({
            where: {
                private: false,
                createdById: createdBy.id,
            },
            skip: offset,
            take: limit,
            include: {
                options: {
                    select: {
                        id: true,
                        texts: true,
                        totalVotes: true,
                    }
                },
                votes: {
                    where: {
                        userId: user.id,
                    },
                    select: {
                        optionId: true,
                    }
                }
            },
            orderBy: {
                date: 'desc'
            }
        })

        totalPollsCount = await prisma.poll.count({
            where: {
                private: false,
                createdById: createdBy.id
            }
        })

        isAuthenticated = false
    }

    const pollsWithVoteStatus = polls.map((poll) => {
        const hasVoted = poll.votes.length > 0
        const votedOption = hasVoted ? poll.votes[0].optionId : null
        return {
            ...poll,
            hasVoted,
            votedOption
        }
    })

    sendSuccess(res, StatusCodes.OK, {
        polls: pollsWithVoteStatus,
        length: totalPollsCount,
        isAuthenticated
    })
})

export default fetchUserPolls
