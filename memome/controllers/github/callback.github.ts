import axios from 'axios'
import { Octokit } from 'octokit'
import prisma from '../../prisma'
import { Request, Response } from 'express'
import genTokens from '../../utils/genTokens'
import { USER_REGEX } from '../../utils/RegExp'
import welcome from '../../services/welcome.mail'
import newLogin from '../../services/new-login.mail'
import { enc_decrypt } from '../../helpers/enc_decrypt'
import connectModels from '../../helpers/connect-models'
import genRandomString from '../../utils/genRandomString'
const expressAsyncHanlder = require('express-async-handler')

const githubAuthCallback = expressAsyncHanlder(async (req: Request, res: Response) => {
    const { code } = req.query
    const { CLIENT_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

    const { data } = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
            code,
            client_id: GITHUB_CLIENT_ID!,
            client_secret: GITHUB_CLIENT_SECRET,
        }
    )

    const accessToken = new URLSearchParams(data).get('access_token')
    if (!accessToken) {
        res.redirect(`${CLIENT_URL}/login`)
        return
    }

    const octokit = new Octokit({
        auth: accessToken,
    })

    const userResponse = await octokit.request("GET /user")
    const emailsResonse = await octokit.request("GET /user/emails")

    const userData = userResponse.data
    const email = emailsResonse.data[0].email

    let username = userData.login?.toLowerCase() || ''

    const isProd = process.env.NODE_ENV === 'production'

    const userAgent = req.headers['user-agent']
    const ipAddress = req.socket.remoteAddress?.split(":")[3]

    let user = await prisma.users.findUnique({
        where: { email }
    })

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
                auth_method: 'github',
                provider_id: String(userData.id),
            }
        })

        await connectModels(user.id, userData.avatar_url)

        await welcome(username, email)
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

    await genTokens(res, user.id)

    if (await enc_decrypt(user.ip_address!, 'd') !== ipAddress) {
        isProd && await newLogin(user.email, user.username, userAgent!, ipAddress!)
    }

    res.redirect(`${CLIENT_URL}/profile`)
})

export { githubAuthCallback }