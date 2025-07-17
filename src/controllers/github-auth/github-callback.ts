import { Request, Response } from 'express';
import { getGithubUserData } from '../../lib/oauth/get-github-user-data.js';
import { BadRequest } from 'custom-exceptions-express';
import { storeUser } from '../../lib/prisma/store-oauth-user.js';

export const githubCallback = async (req: Request, res: Response) => {

	const code = req.query.code; //$ this code can only be used once.

	if(!code){
		throw new BadRequest('Missing Github code')
	}
	//@ts-ignore
	const {access_token, user} = await getGithubUserData(code) //? TYPE ERROR HERE
	
	const savedUser = await storeUser({
		oauthEncryptedAccessToken: access_token,
		oauthProvider: 'github',
		...user
	})


	const response: ServerResponse = {
		message: 'User created successfully',
		success: true,
		data: savedUser
	}

	res.send(response);
};
