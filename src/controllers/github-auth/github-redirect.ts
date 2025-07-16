import { Request, Response } from 'express';

export const githubRedirect = async(req: Request, res: Response)=>{
    const redirectUri = "http://localhost:3001/auth/github/callback" //$ It is kind of redundant since we already set this up in our GitHub application but it seems that it is some kind of security measure to have to verify it.

    const clientId = process.env.GITHUB_CLIENT_ID
}