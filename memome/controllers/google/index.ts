import prisma from '../../prisma'
import { Request } from 'express'
import { Profile } from 'passport'
import genTokens from '../../utils/genTokens'
import { USER_REGEX } from '../../utils/RegExp'
import welcome from '../../services/welcome.mail'
import newLogin from '../../services/new-login.mail'
import { enc_decrypt } from '../../helpers/enc_decrypt'
import connectModels from '../../helpers/connect-models'
import genRandomString from '../../utils/genRandomString'

const googleAuth = async (
    req: Request, refreshToken: string,
    accessToken: string, profile: Profile, done: any
) => {
    try {
        const email: string = profile.emails![0].value

        let user = await prisma.users.findUnique({
            where: {
                provider_id: profile.id
            }
        })

        let username: string = email.split('@')[0]

        const isProd = process.env.NODE_ENV === 'production'

        const userAgent = req.headers['user-agent']
        const ipAddress = req.socket.remoteAddress?.split(":")[3]

        if (!user) {
            const usernameTaken = await prisma.users.findUnique({
                where: { username }
            })

            if (usernameTaken || !USER_REGEX.test(username)) {
                username = genRandomString()
            }

            user = await prisma.users.create({
                data: {
                    email, username,
                    email_verified: true,
                    auth_method: 'google',
                    provider_id: profile.id,
                }
            })

            await connectModels(user.id, profile.photos![0].value)

            isProd && await welcome(username, email)
        }

        await prisma.users.update({
            where: {
                username: user.username
            },
            data: {
                last_login: new Date().toISOString(),
                ip_address: await enc_decrypt(ipAddress!, 'e'),
            }
        })

        await genTokens(req?.res!, user.id)

        if (await enc_decrypt(user.ip_address!, 'd') !== ipAddress) {
            isProd && await newLogin(user.email, user.username, userAgent!, ipAddress!)
        }

        return done(null, user)
    } catch (err) {
        return done(err, null)
    }
}

export default googleAuth