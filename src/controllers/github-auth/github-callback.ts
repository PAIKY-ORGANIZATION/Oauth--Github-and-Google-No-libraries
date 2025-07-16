import { Request, Response } from 'express';
import axios from 'axios';

export const githubCallback = async (req: Request, res: Response) => {
	const code = req.query.code; //$ this code can only be used once.

	const response = await axios.post(
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

	console.log(response.data);

	const { access_token } = response.data;

	console.log({ access_token });

	const userRes = await axios.get('https://api.github.com/user', {
		headers: { Authorization: 'Bearer ' + access_token },
	});

	console.log(userRes.data);

	const emailRes = await axios.get('https://api.github.com/user/emails', {
		headers: { Authorization: 'Bearer ' + access_token },
	});

	// emailsArray will look like this:
	// [
	// 	{
	// 		email: '4aOjS@example.com',
	// 		verified: true,
	// 		primary: true,
	// 		visibility: 'public'
	// 	},
	// 	{
	// 		email: 'V7a8p@example.com',
	// 		verified: true,
	// 		primary: false,
	// 		visibility: 'public'
	// 	}
	//]

	type Email = {
		email: string;
		verified: boolean;
		primary: boolean;
		visibility: string;
	};

	const emailsArray: Email[] = emailRes.data;

	const verifiedEmail = emailsArray.find(
		(emailObject: Email) => emailObject.verified === true
	)?.email;

	console.log({ verifiedEmail });
	

	res.send('Success');
};
