import { storeUser } from '../lib/prisma/store-oauth-user.js';
import { encrypt } from '../lib/encrypt.js';
import { generateJwtAndAddToResponse } from '../lib/jwt-cookies.js';
import { Request, Response } from 'express';
import { BadRequest } from 'custom-exceptions-express';

//% In this controller:
//% 2. We get the access token with a code from either Github or Google
//% 3. We get the user data with the access token
//% 4. We encrypt the access token for future use
//% 5. We store the user in Prisma
//% 6. We generate the JWT and add it to the response object as a cookie


type Params = {
	req: Request;
	res: Response;
	getTokenFunction: (code: string) => Promise<string>;
	getOauthUserDataByToken: (accessToken: string) => Promise<UserReturnedByTokenUse>;
	oauthProvider: 'github' | 'google';
}

// prettier-ignore
export const sharedOauthCallbackController = async (
	{ req, res, oauthProvider, getTokenFunction, getOauthUserDataByToken}: Params
) => {
	
	//* Get the code that was sent by GitHub/Google. We use this to get the access token.
	const code = req.query.code?.toString(); //$ this code can only be used once.
	if (!code) throw new BadRequest('Missing code');

	//* Get the access token with the code
	const accessToken = await getTokenFunction(code);

	//* Send the access token to get the user data in exchange.
	const user = await getOauthUserDataByToken(accessToken);

	//* Encrypt the access token before storing it
	const {
		encrypted: encryptedOauthAccessToken,
		iv: encryptedOauthAccessTokenIv,
	} = encrypt(accessToken);

	//* Store the user in Prisma
	const savedUser = await storeUser({
		encryptedOauthAccessToken,
		encryptedOauthAccessTokenIv,
		oauthProvider,
		...user,
	});

	//* Generate the JWT and add it to the response object as a cookie.
	generateJwtAndAddToResponse(savedUser.id, res);

	const response: ServerResponse = {
		message: 'User created successfully',
		success: true,
		data: savedUser,
	};

	res.send(response);
};
