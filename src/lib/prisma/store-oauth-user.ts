import { prisma } from './prisma-client.js';



type User = {
	username: string;
	oauthProvider: string;
	oauthProviderId: number;
	email: string;
	oauthEncryptedAccessToken: string;
	fullName: string | null;
	imageURL?: string;
};


// prettier-ignore
export const storeUser = async ({ username, oauthProvider, oauthProviderId, email, oauthEncryptedAccessToken, fullName, imageURL, } : User) => {
	const user = await prisma.user.create({
		data: { 
			username,
			oauthProvider,
			oauthProviderId,
			email,
			oauthEncryptedAccessToken,
			fullName,
			imageURL
		},
	});

	return user
};
