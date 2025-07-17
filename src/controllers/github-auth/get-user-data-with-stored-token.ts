//% This file focuses on using decryption to reuse the encrypted authorization token to refetch user data from GitHub.
import { Request, Response } from 'express';
import { getUserById } from '../../lib/prisma/get-user-by-id.js';
import { Unauthorized } from 'custom-exceptions-express';
import { decrypt } from '../../lib/encrypt.js';
import { getGithubUserData } from '../../lib/oauth/github/get-github-user-data.js';

export const getUserDataWithStoredToken = async(req: Request, res: Response)=>{
    const {userId} = (req as any).userId //$ Assuming that authorization middleware was successful.

    const user = await getUserById(userId)

    if(!user) throw new Unauthorized('User not associated with this JWT token.')
    
    if(!user.encryptedOauthAccessToken) throw new Unauthorized('Oauth access token not found.')

    const decryptedAccessToken = decrypt(user.encryptedOauthAccessToken, user.encryptedOauthAccessTokenIv!)

    const userData = await getGithubUserData(decryptedAccessToken)

    const response: ServerResponse = {
        message: 'User data fetched successfully',
        success: true,
        data: userData
    }

    res.send(response)

}