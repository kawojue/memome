import { Request, Response } from 'express'

const { GITHUB_CLIENT_ID } = process.env

const githubAuth = async (req: Request, res: Response) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`)
}

export { githubAuth }