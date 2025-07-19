import { Request, Response } from 'express';
import { CALLBACK_PATH_GITHUB } from '../../lib/variables.js';

export const redirectToGithub = async(_req: Request, res: Response)=>{

    const redirectUriBase = process.env.LOCAL_SERVER_BASE_URL //$ Looks like "http://localhost:3001"
    
    //! This same one must be used in the router. Router by def. starts with "/api"
    const redirectUri = redirectUriBase + '/api' + CALLBACK_PATH_GITHUB  //$ Looks like "http://localhost:3001 + /api/auth/github/callback" 

    const clientId = process.env.CLIENT_ID_GITHUB
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`
    res.redirect(url)

    //% Set "scope=user:email" to receive both the user and email information.
}