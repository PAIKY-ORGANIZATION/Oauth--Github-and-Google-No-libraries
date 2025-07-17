import { Request, Response } from 'express';
import { getGoogleAccessTokenByCode } from '../../lib/oauth/google/get-access-token-with-code.js';
import { BadRequest } from 'custom-exceptions-express';
import { getGoogleUserDataByToken } from '../../lib/oauth/google/get-google-user-data.js';
import { encrypt } from '../../lib/encrypt.js';
import { storeUser } from '../../lib/prisma/store-oauth-user.js';
import { generateJwtAndAddToResponse } from '../../lib/jwt-cookies.js';

//% In this controller:
//% 1. We get the code from Google
//% 2. We get the access token with the code
//% 3. We get the user data with the access token
//% 4. We encrypt the access token for future use
//% 5. We store the user in Prisma
//% 6. We generate the JWT and add it to the response object as a cookie


export const googleCallback = async(req: Request, res: Response)=>{

	//* Get the code that was sent by Google. We use this to get the access token.
    const code = req.query.code?.toString(); //$ this code can only be used once.
    if(!code)throw new BadRequest('Missing Github code') 

    //* Get the access token with the code
    const accessToken = await getGoogleAccessTokenByCode(code)

    //* Send the access token to get the user data in exchange.
    const userData = await getGoogleUserDataByToken(accessToken)    
   
    const {encrypted: encryptedOauthAccessToken, iv: encryptedOauthAccessTokenIv} = encrypt(accessToken)

	//* Store the user in Prisma
    const savedUser = await storeUser({
        encryptedOauthAccessToken,
        encryptedOauthAccessTokenIv,
        oauthProvider: 'google',
        ...userData
    })

    generateJwtAndAddToResponse(savedUser.id, res)

    const response: ServerResponse = {
        message: 'User data fetched successfully',
        success: true,
        data: userData
    }

    res.send(response)
}