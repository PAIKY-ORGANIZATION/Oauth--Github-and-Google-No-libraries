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

	const verifiedEmail = emailData.find(
		(emailObject) => emailObject.verified === true
	)?.email;

    if(!verifiedEmail) throw new BadRequest('No verified email found')

    const user = {
        username: userData.login,
        email: verifiedEmail,
        imageURL: userData.avatar_url,
        fullName: userData.name,
        oauthProviderId: userData.id
    }

    return {user, access_token}
}


