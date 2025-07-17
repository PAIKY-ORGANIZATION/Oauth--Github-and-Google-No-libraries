import { BadRequest } from 'custom-exceptions-express';
import { prisma } from './prisma-client.js';



type User = {
	username: string;
	oauthProvider: string;
	oauthProviderId: string; //$  Prisma needs a string when storing a long integer (Google long ones, not Github ones) | Can't use Bigints
	email: string;
	isVerifiedEmail: boolean;
	encryptedOauthAccessToken: string;
	encryptedOauthAccessTokenIv: string;
	fullName: string | null;
	imageURL?: string;
};


// prettier-ignore
export const storeUser = async ({ username, oauthProvider, oauthProviderId, email, isVerifiedEmail, encryptedOauthAccessToken, encryptedOauthAccessTokenIv, fullName, imageURL, } : User) => {

	//% Reject cases where either the email already exists or the Github/Google Account ID already exist.
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{email}, {oauthProviderId}]  //$  Prisma needs a string when storing a long integer (Google long ones, not Github ones) | Can't use Bigints
		}
	})

	if(existingUser) throw new BadRequest('User already exists')


	const user = await prisma.user.create({
		data: { 
			username,
			oauthProvider,
			oauthProviderId: oauthProviderId,  //$  Prisma needs a string when storing a long integer (Google long ones, not Github ones) | Can't use Bigints
			email,
			isVerifiedEmail,
			encryptedOauthAccessToken,
			encryptedOauthAccessTokenIv,
			fullName,
			imageURL
		},
	});

	return user
};
