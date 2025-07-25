import { Request, Response } from 'express';
import { getGithubUserDataByToken } from '../../lib/oauth/github/get-github-user-data.js';
import { getGithubAccessTokenByCode } from '../../lib/oauth/github/get-access-token-with-code.js';
import { sharedOauthCallbackController } from '../oauth-shared/shared-oauth-callback-controller.js';


export const githubCallbackController = async (req: Request, res: Response) => {
	await sharedOauthCallbackController({
		getTokenFunction: getGithubAccessTokenByCode,
		getOauthUserDataByToken: getGithubUserDataByToken,
		oauthProvider: 'github',
		res,
		req,
	});
};


