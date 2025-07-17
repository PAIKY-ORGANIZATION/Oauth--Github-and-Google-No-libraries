import axios from 'axios';
import { BadRequest } from 'custom-exceptions-express';



export const getGithubUserData = async(code: string)=>{

    
	const response = await axios.post<{ access_token: string }>(
		'https://github.com/login/oauth/access_token',
		{
			client_id: process.env.GITHUB_CLIENT_ID,
			client_secret: process.env.GITHUB_CLIENT_SECRET,
			code,
		},
		{
			headers: {
				Accept: 'application/json', //$ This is required.  If you don't include it you will instead receive the token like this:  "access_token=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&scope=user%3Aemail&token_type=bearer"
				//$ Technically it would also work if you parse it.
			},
		}
	);

	const { access_token } = response.data;


	const {data: userData} = await axios.get<GitHubUserResponse>('https://api.github.com/user', {
		headers: { Authorization: 'Bearer ' + access_token },
	});



	const emailRes = await axios.get<GitHubEmailResponse>('https://api.github.com/user/emails', {
		headers: { Authorization: 'Bearer ' + access_token },
	});



	const emailsArray = emailRes.data;

	const verifiedEmail = emailsArray.find(
		(emailObject) => emailObject.verified === true
	)?.email;

    if(!verifiedEmail){
        throw new BadRequest('No verified email found')
    }

    const user = {
        username: userData.login,
        email: verifiedEmail,
        imageURL: userData.avatar_url,
        fullName: userData.name,
        oauthProviderId: userData.id
    }


    return {user, access_token}
}