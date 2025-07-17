//% This file focuses on using decryption to reuse the encrypted authorization token to refetch user data from GitHub.

//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS
//¡ TRY THIS

import { Request, Response } from 'express';
import { getUserById } from '../../lib/prisma/get-user-by-id.js';
import { Unauthorized } from 'custom-exceptions-express';
import { decrypt } from '../../lib/encrypt.js';

export const getPermittedUserData = async(req: Request, res: Response)=>{
    const {userId} = (req as any).userId //$ Assuming that authorization middleware was successful.

    const user = await getUserById(userId)

    if(!user) throw new Unauthorized('User not associated with this JWT token.')
    
    if(!user.encryptedOauthAccessToken) throw new Unauthorized('Oauth access token not found.')

    const decryptedAccessToken = decrypt(user.encryptedOauthAccessToken, user.encryptedOauthAccessTokenIv!)

    res.send(decryptedAccessToken)

}