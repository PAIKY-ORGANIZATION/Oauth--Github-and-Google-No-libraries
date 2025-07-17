import { Request, Response } from 'express';
import { getGithubUserData } from '../../lib/oauth/get-github-user-data.js';
import { BadRequest } from 'custom-exceptions-express';
import { storeUser } from '../../lib/prisma/store-oauth-user.js';
import { encrypt } from '../../lib/encrypt.js';
import { generateJwtAndAddToResponse } from '../../lib/jwt-cookies.js';
import { getGithubAccessTokenByCode } from '../../lib/oauth/get-access-token-with-code.js';

//% In this controller:
//% 1. We get the code from GitHub
//% 2. We get the access token with the code
//% 3. We get the user data with the access token
//% 4. We encrypt the access token for future use
//% 5. We store the user in Prisma
//% 6. We generate the JWT and add it to the response object as a cookie



export const githubCallback = async (req: Request, res: Response) => {

	//* Get the code that was sent by GitHub. We use this to get the access token.
	const code = req.query.code?.toString(); //$ this code can only be used once.
	if(!code)throw new BadRequest('Missing Github code') 

	//* Get the access token with the code
	const accessToken  = await getGithubAccessTokenByCode(code)


	//* Send the access token to get the user data in exchange.
	const {access_token, user} = await getGithubUserData(accessToken) 
	
	//* Encrypt the access token before storing it
	const {encrypted: encryptedOauthAccessToken, iv: encryptedOauthAccessTokenIv} = encrypt(access_token)
	
	//* Store the user in Prisma
	const savedUser = await storeUser({
		encryptedOauthAccessToken,
		encryptedOauthAccessTokenIv,
		oauthProvider: 'github',
		...user
	})

	//* Generate the JWT and add it to the response object as a cookie.
	generateJwtAndAddToResponse(savedUser.id, res)

	const response: ServerResponse = {
		message: 'User created successfully',
		success: true,
		data: savedUser
	}

	res.send(response);
};