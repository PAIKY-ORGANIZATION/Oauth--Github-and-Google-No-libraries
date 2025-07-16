import { Request, Response } from 'express';


export const githubCallback = async (req: Request,res: Response) => {

	const response: ServerResponse = { message: 'Success', success: true, data: {  } } 

	res.send(response );
};

