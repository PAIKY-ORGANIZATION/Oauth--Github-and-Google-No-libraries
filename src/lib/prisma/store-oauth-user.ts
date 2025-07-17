import { BadRequest } from 'custom-exceptions-express';
import { prisma } from './prisma-client.js';



type User = {
	username: string;
	oauthProvider: string;
	oauthProviderId: number;
	email: string;
	isVerifiedEmail: boolean;
	encryptedOauthAccessToken: string;
	encryptedOauthAccessTokenIv: string;
	fullName: string | null;
	imageURL?: string;
};


// prettier-ignore
export const storeUser = async ({ username, oauthProvider, oauthProviderId, email, encryptedOauthAccessToken, encryptedOauthAccessTokenIv, fullName, imageURL, } : User) => {

	//% Reject cases where either the email already exists or the Github/Google Account ID already exist.
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{email}, {oauthProviderId}]
		}
	})

	if(existingUser) throw new BadRequest('User already exists')


	const user = await prisma.user.create({
		data: { 
			username,
			oauthProvider,
			oauthProviderId,
			email,
			encryptedOauthAccessToken,
			encryptedOauthAccessTokenIv,
			fullName,
			imageURL
		},
	});

	return user
};
