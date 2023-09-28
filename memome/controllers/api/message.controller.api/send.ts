import prisma from '../../../prisma'
import { Request, Response } from 'express'
import handleFile from '../../../utils/file'
import MaxSize from '../../../enums/fileMaxSizes'
import StatusCodes from '../../../enums/StatusCodes'
import genFileName from '../../../utils/genFileName'
import expressAsyncHandler from 'express-async-handler'
import { enc_decrypt } from '../../../helpers/enc_decrypt'
import { deleteS3, getS3, uploadS3 } from '../../../helpers/s3'
import { sendError, sendSuccess } from '../../../helpers/sendRes'


const sendMsg = expressAsyncHandler(async (req: Request, res: Response) => {
    let { texts } = req.body
    const { username } = req.params

    let filesArr: any[] = []
    let files = req.files as any[] || []

    if (texts && texts?.length > 801) {
        sendError(res, StatusCodes.BadRequest, 'Texts exceed the maximum length of characters.')
        return
    }

    const user = await prisma.users.findUnique({
        where: { username },
        select: {
            id: true,
            Account: true,
            Settings: true
        }
    })

    if (!user) {
        sendError(res, StatusCodes.NotFound, 'User not found.')
        return
    }

    if (!user.Settings?.allow_files) {
        files = []
    }

    if (!user.Settings?.allow_texts) {
        texts = null
    }

    if (user.Account?.disabled) {
        sendError(res, StatusCodes.Unauthorized, 'Account has been disabled by user.')
        return
    }

    if (files.length === 0 && !texts) {
        sendError(res, StatusCodes.BadRequest, 'Blank Message.')
        return
    }

    if (files.length > 2) {
        sendError(res, StatusCodes.PayloadTooLarge, 'Only a maximum of two (2) files is allowed.')
        return
    }

    try {
        filesArr = await Promise.all(files.map(async (file: File) => {
            const tempFile = await handleFile(
                res,
                file,
                MaxSize['9MB'],
                'jpg', 'png', 'mp4'
            )
            const type = tempFile.mimetype
            const path = `Message/${user.id}/${genFileName()}.${tempFile.extension}`
            await uploadS3(tempFile.buffer, path, type)
            const url = await getS3(path)
            return { path, url, type }
        }))
    } catch {
        try {
            if (filesArr.length > 0) {
                for (const file of filesArr) {
                    await deleteS3(file?.path)
                }
            }
            filesArr = []
        } catch {
            sendError(res, StatusCodes.BadRequest, 'Something went wrong.')
            return
        }
    }

    await prisma.message.create({
        data: {
            files: filesArr,
            date: new Date().toISOString(),
            texts: await enc_decrypt(texts, 'e'),
            user: {
                connect: {
                    id: user.id
                }
            }
        },
    })

    await prisma.profiles.update({
        where: {
            userId: user.id
        },
        data: {
            msg_point: {
                increment: filesArr.length > 0 ? 0.5 : 0.4
            }
        }
    })

    sendSuccess(res, StatusCodes.Created)
})

export default sendMsg