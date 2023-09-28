import sharp from 'sharp'
import prisma from '../../prisma'
import handleFile from '../../utils/file'
import { Request, Response } from 'express'
import MaxSize from '../../enums/fileMaxSizes'
import StatusCodes from '../../enums/StatusCodes'
import genFileName from '../../utils/genFileName'
import expressAsyncHandler from 'express-async-handler'
import { deleteS3, getS3, uploadS3 } from '../../helpers/s3'
import { sendError, sendSuccess } from '../../helpers/sendRes'


const profile = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId

    const user = await prisma.users.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            email: true,
            Profile: true,
            Account: true,
            Settings: true,
            username: true,
            email_verified: true,
        },
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'Something went wrong.')
        return
    }

    sendSuccess(res, StatusCodes.OK, { user })
})

const deleteAvatar = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId

    const profile = await prisma.profiles.findUnique({
        where: { userId }
    })

    if (!profile) {
        sendError(res, StatusCodes.Conflict, 'Something went wrong.')
        return
    }

    const path = profile.avatar?.path

    if (path) {
        try {
            await deleteS3(path)
        } catch {
            sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
            return
        }
    }

    await prisma.profiles.update({
        where: { userId },
        data: {
            avatar: {
                url: '',
                path: '',
                type: null,
            }
        }
    })

    sendSuccess(res, StatusCodes.OK, { msg: 'Done.' })
})

const changeAvatar = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId

    const profile = await prisma.profiles.findUnique({
        where: { userId }
    })

    if (!profile) {
        sendError(res, StatusCodes.Conflict, 'Something went wrong.')
        return
    }

    if (profile.avatar?.path) {
        try {
            await deleteS3(profile.avatar?.path)
        } catch {
            sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
        }
    }

    try {
        const file = await handleFile(
            res,
            req.file,
            MaxSize['5MB'],
            'jpg', 'png',
        )
        const path = `Avatar/${userId}/${genFileName()}.${file.extension}`
        const url = await getS3(path)
        const type = file.mimetype

        const buffer = await sharp(file.buffer)
            .resize({ fit: 'cover' })
            .toBuffer()
        await uploadS3(buffer, path, type)
        await prisma.profiles.update({
            where: { userId },
            data: {
                avatar: { url, path, type }
            }
        })
    } catch {
        sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
        return
    }

    sendSuccess(res, StatusCodes.OK, { msg: 'Successfully changed.' })
})

const editBio = expressAsyncHandler(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId
    const { bio } = req.body

    if (bio?.length > 150) {
        sendError(res, StatusCodes.PayloadTooLarge, 'Please use 150 characters at maximum.')
        return
    }

    await prisma.profiles.update({
        where: { userId },
        data: {
            bio: bio || ''
        }
    })

    sendSuccess(res, StatusCodes.OK)
})

export default profile
export { deleteAvatar, changeAvatar, editBio }