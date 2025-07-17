import { prisma } from './prisma-client.js';



type User = {
	username: string;
	oauthProvider: string;
	oauthProviderId: number;
	email: string;
	encryptedOauthAccessToken: string;
	fullName: string | null;
	imageURL?: string;
};


// prettier-ignore
export const storeUser = async ({ username, oauthProvider, oauthProviderId, email, encryptedOauthAccessToken, fullName, imageURL, } : User) => {
	const user = await prisma.user.create({
		data: { 
			username,
			oauthProvider,
			oauthProviderId,
			email,
			encryptedOauthAccessToken,
			fullName,
			imageURL
		},
	});

	return user
};
