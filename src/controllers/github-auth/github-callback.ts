import { Request, Response } from 'express';
import { getGithubUserDataByToken } from '../../lib/oauth/github/get-github-user-data.js';
import { getGithubAccessTokenByCode } from '../../lib/oauth/github/get-access-token-with-code.js';
import { sharedOauthCallbackController } from '../shared-oauth-callback-controller.js';

//% In this controller:
//% 1. We get the code from GitHub
//% 2. We get the access token with the code
//% 3. We get the user data with the access token
//% 4. We encrypt the access token for future use
//% 5. We store the user in Prisma
//% 6. We generate the JWT and add it to the response object as a cookie

export const githubCallbackController = async (req: Request, res: Response) => {
	await sharedOauthCallbackController({
		getTokenFunction: getGithubAccessTokenByCode,
		getOauthUserDataByToken: getGithubUserDataByToken,
		oauthProvider: 'github',
		res,
		req,
	});
};
