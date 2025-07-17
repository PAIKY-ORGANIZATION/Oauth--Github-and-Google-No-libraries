import { Request, Response } from 'express';
import { getGithubUserData } from '../../lib/oauth/get-github-user-data.js';
import { BadRequest } from 'custom-exceptions-express';
import { storeUser } from '../../lib/prisma/store-oauth-user.js';
import { encrypt } from '../../lib/encrypt.js';
import { generateJwtAndAddToResponse } from '../../lib/jwt-cookies.js';

export const githubCallback = async (req: Request, res: Response) => {

	//* Get the code that was sent by GitHub. We use this to get the access token.
	const code = req.query.code; //$ this code can only be used once.
	if(!code)throw new BadRequest('Missing Github code') 


	//@ts-ignore
	//* Send the code to GitHub to get the access token and then use the access token to get the user data in exchange.
	const {access_token, user} = await getGithubUserData(code) //! TYPE ERROR HERE
	
	//* Encrypt the access token
	const encryptedOauthAccessToken = encrypt(access_token)

	//* Store the user in Prisma
	const savedUser = await storeUser({
		encryptedOauthAccessToken,
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
