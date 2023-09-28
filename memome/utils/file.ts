import { Response } from 'express'
import MaxSize from '../enums/fileMaxSizes'
import { sendError } from '../helpers/sendRes'
import StatusCodes from '../enums/StatusCodes'

/*
mb - megabit * 1000
MB - megabyte * 1024
*/

const handleFile = (
    res: Response,
    file: any,
    maxSize: MaxSize,
    ...extensions: string[]
): any => {
    const size: number = file.size
    const extension = file.originalname.split('.').pop()
    const isAllowedExtension = extensions.includes(extension)

    if (!isAllowedExtension) {
        sendError(
            res,
            StatusCodes.BadRequest,
            `Invalid file format - ${file.originalname}`
        )
        return
    }

    if (size > maxSize) {
        sendError(
            res,
            StatusCodes.PayloadTooLarge,
            `File too large. > ${maxSize / (1024 * 1024)}MB - ${file.originalname}`
        )
        return
    }

    return { ...file, extension }
}

export default handleFile