import { ILimiter } from '../type'
import rateLimit, {
    RateLimitRequestHandler, Options
} from 'express-rate-limit'
import { sendError } from '../helpers/sendRes'
import { Request, Response, NextFunction } from 'express'

export default function limit({
    max,
    timerArr,
    msg = "Too many requests sent."
}: ILimiter): RateLimitRequestHandler {
    const limiter: RateLimitRequestHandler = rateLimit({
        max, // max attempt
        windowMs: timerArr[Math.floor(Math.random() * timerArr.length)] * 1000, // throttle
        message: msg,
        handler: (req: Request, res: Response, next: NextFunction, options: Options) => {
            sendError(res, options.statusCode, options.message)
        },
        legacyHeaders: false,
        standardHeaders: true,
    })

    return limiter
}