import { Request, Response } from 'express';

export const redirectToGithub = async(_req: Request, res: Response)=>{

    const redirectUriBase = process.env.LOCAL_SERVER_BASE_URL

    const redirectUri = redirectUriBase+ "/api/auth/github/callback" //$ It is kind of redundant since we already set this up in our GitHub application but it seems that it is some kind of security measure to have to verify it.

    const clientId = process.env.CLIENT_ID_GITHUB
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`
    res.redirect(url)

    //% Set "scope=user:email" to receive both the user and email information.
}