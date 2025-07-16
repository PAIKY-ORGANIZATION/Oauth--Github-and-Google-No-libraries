import { Request, Response } from 'express';
import axios from 'axios'
export const googleCallback = async(req: Request, res: Response)=>{
    const {code} = req.query

    const redirectUri = "http://localhost:3001/api/auth/google/callback"




    const tokenResponse = await axios.post(`https://oauth2.googleapis.com/token`, {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
    })
    
    const {access_token} = tokenResponse.data

    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })


    console.log(userResponse.data)
    res.send('Success')
}