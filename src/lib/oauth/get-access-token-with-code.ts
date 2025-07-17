import axios from 'axios'

export const getGithubAccessTokenByCode = async(code: string)=>{

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
    return access_token
}