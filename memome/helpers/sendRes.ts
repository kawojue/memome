import { Response } from 'express'

const sendError = (res: Response, statusCode: number, msg?: string): void => {
    res.status(statusCode).json({ success: false, msg })
}

const sendSuccess = (res: Response, statusCode: number, data?: any): void => {
    res.status(statusCode).json({ success: true, ...data })
}

export { sendError, sendSuccess }