import axios from 'axios';
import { BadRequest } from 'custom-exceptions-express';



export const getGithubUserDataByToken = async(access_token: string)=>{

    
    //* =============================  With the access token, get the user data    ==================================

	const {data: userData} = await axios.get<GitHubUserResponse>('https://api.github.com/user', {
		headers: { Authorization: 'Bearer ' + access_token },
	});

	//$ This gives an array of email-objects
	const {data: emailData} = await axios.get<GitHubEmailResponse>('https://api.github.com/user/emails', {
		headers: { Authorization: 'Bearer ' + access_token },
	});


    //* =====================================  Parse the user data    =========================================

    //% The Github response for emails:
    //% 1. Can include both verified and unverified emails.
    //% 2. Can include more than two emails, depending on how many the user has added to their GitHub account.
    
    const primaryVerifiedEmail = emailData.find((emailObj) => emailObj.verified)?.email;
    const fallbackEmail = emailData.find((emailObj) => !emailObj.verified)?.email;

    const email = primaryVerifiedEmail || fallbackEmail;
    const isVerifiedEmail = primaryVerifiedEmail !== undefined;

    if(!email) throw new BadRequest('No email found')


        
        
    const user: UserReturnedByTokenUse = { //* we use this specific structure so that it is compatible with Prisma "storeUser()" 
        username: userData.login,
        email,
        isVerifiedEmail,
        imageURL: userData.avatar_url,
        fullName: userData.name,
        oauthProviderId: userData.id.toString() //$  Prisma needs a string when storing a long integer (Google long ones, not Github ones) | Can't use Bigints
    }

    return user
}


