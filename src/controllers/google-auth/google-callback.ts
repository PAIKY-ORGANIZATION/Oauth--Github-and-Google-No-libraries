import { Request, Response } from 'express';
import axios from 'axios'
import { getGoogleAccessTokenByCode } from '../../lib/oauth/google/get-access-token-with-code.js';
import { BadRequest } from 'custom-exceptions-express';
import { getGoogleUserDataByToken } from '../../lib/oauth/google/get-google-user-data.js';
export const googleCallback = async(req: Request, res: Response)=>{

    const code = req.query.code?.toString(); //$ this code can only be used once.
    if(!code)throw new BadRequest('Missing Github code') 


    const accessToken = await getGoogleAccessTokenByCode(code)


    const userData = await getGoogleUserDataByToken(accessToken)    
   
    const response: ServerResponse = {
        message: 'User data fetched successfully',
        success: true,
        data: userData
    }

    res.send(response)
}