import { Request, Response } from 'express';
import axios from 'axios';

export const githubCallback = async (req: Request,res: Response) => {

	const code = req.query.code //$ this code can only be used once.

	const response = await axios.post('https://github.com/login/oauth/access_token', {
		client_id: process.env.GITHUB_CLIENT_ID,
		client_secret: process.env.GITHUB_CLIENT_SECRET,
		code
	})

	const {access_token} = response.data

	const userRes = await axios.get('https://api.github.com/user', {
		headers: {Authorization: 'Bearer ' + access_token}
	})

	console.log(userRes.data);
	


	const emailRes = await axios.get('https://api.github.com/user/emails', {
		headers: {Authorization: 'Bearer ' + access_token}
	})

	console.log(emailRes.data);

	res.send('Success');
};

