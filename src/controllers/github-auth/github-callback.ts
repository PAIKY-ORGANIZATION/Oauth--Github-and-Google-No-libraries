import { Request, Response } from 'express';
import { getGithubUserData } from '../../lib/oauth/get-github-user-data.js';
import { BadRequest } from 'custom-exceptions-express';
import { storeUser } from '../../lib/prisma/store-user.js';

export const githubCallback = async (req: Request, res: Response) => {

	const code = req.query.code; //$ this code can only be used once.

	if(!code){
		throw new BadRequest('Missing Github code')
	}

	const {access_token, user} = await getGithubUserData(code) //?
	
	const user = await storeUser()

	res.send('Success');
};
