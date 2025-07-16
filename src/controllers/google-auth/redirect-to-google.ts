import { Request, Response } from 'express';

export const redirectToGoogle = async(req: Request, res: Response)=>{
    
    const googleClientId = process.env.GOOGLE_CLIENT_ID

    const redirectUri = "http://localhost:3001/api/auth/google/callback"

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email`)


}