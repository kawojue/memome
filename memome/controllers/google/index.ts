import prisma from '../../prisma'
import { Request } from 'express'
import { Profile } from 'passport'
import genTokens from '../../utils/genTokens'
import { USER_REGEX } from '../../utils/RegExp'
import welcome from '../../services/welcome.mail'
import newLogin from '../../services/new-login.mail'
import { getIpAddress } from '../../utils/getIpAddress'
import { enc_decrypt } from '../../helpers/enc_decrypt'
import connectModels from '../../helpers/connect-models'
import { generateUsername } from 'unique-username-generator'

const googleAuth = async (
    req: Request, refreshToken: string,
    accessToken: string, profile: Profile, done: any
) => {
    try {
        const email: string = profile.emails![0].value

        let user = await prisma.users.findFirst({
            where: {
                OR: [
                    { email },
                    {
                        provider_id: profile.id
                    }
                ]
            }
        })

        let username: string = email.split('@')[0]

        const isProd = process.env.NODE_ENV === 'production'

        const ipAddress: string = getIpAddress(req)
        const userAgent = req.headers['user-agent'] || ''

        if (!user) {
            const usernameTaken = await prisma.users.findUnique({
                where: { username }
            })

            if (usernameTaken || !USER_REGEX.test(username)) {
                username = generateUsername("", 0, 32) // no delimiter, 0 to 32 max
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
                user_agent: await enc_decrypt(userAgent, 'e'),
            }
        })

        await genTokens(req?.res!, user.id)

        if (isProd) {
            if (await enc_decrypt(user.user_agent!, 'd') !== userAgent) {
                await newLogin(
                    new Date(
                        new Date().setHours(
                            new Date().getHours() + 1
                        )
                    ).toUTCString(),
                    user.email,
                    user.username,
                    userAgent!,
                    ipAddress,
                    user.auth_method,
                )
            }
        }

        return done(null, user)
    } catch (err) {
        return done(err, null)
    }
}

export default googleAuth