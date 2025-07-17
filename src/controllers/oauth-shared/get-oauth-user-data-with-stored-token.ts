//% This file focuses on using decryption to reuse the encrypted authorization token to refetch user data from GitHub.
import { Request, Response } from 'express';
import { getUserById } from '../../lib/prisma/get-user-by-id.js';
import { Unauthorized } from 'custom-exceptions-express';
import { decrypt } from '../../lib/encrypt.js';
import { getGithubUserDataByToken } from '../../lib/oauth/github/get-github-user-data.js';
import { getGoogleAccessTokenByCode } from '../../lib/oauth/google/get-access-token-with-code.js';

export const getUserDataWithStoredTokenController = async(req: Request, res: Response)=>{
    const {userId} = (req as any).userId //$ Assuming that authorization middleware was successful.

    const user = await getUserById(userId)

    if(!user) throw new Unauthorized('User not associated with this JWT token.')
    
    if(!user.encryptedOauthAccessToken) throw new Unauthorized('Oauth access token not found.')

    const oauthProviderName = user.oauthProvider as 'github' | 'google'

    const decryptedAccessToken = decrypt(user.encryptedOauthAccessToken, user.encryptedOauthAccessTokenIv!)


    const getOauthUserDataByTokenFunction = oauthProviderName === 'github'?
        getGithubUserDataByToken :
        getGoogleAccessTokenByCode

    const userData = await getOauthUserDataByTokenFunction(decryptedAccessToken)

    const response: ServerResponse = {
        message: 'User data fetched successfully',
        success: true,
        data: userData
    }

    res.send(response)

}