import { Request, Response } from 'express';
import { CALLBACK_PATH_GOOGLE } from '../../lib/variables.js';

export const redirectToGoogle = async(_req: Request, res: Response)=>{
    
    
    const redirectUriBase = process.env.LOCAL_SERVER_BASE_URL //$ Looks like "http://localhost:3001"

    //! This same one must be used in the router. Router by def. starts with "/api"
    const redirectUri = redirectUriBase + '/api' + CALLBACK_PATH_GOOGLE //$ Looks like "http://localhost:3001 + /api/auth/google/callback" 

    console.log({redirectUri});
    
    
    
    const googleClientId = process.env.CLIENT_ID_GOOGLE 
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`)

}