//% This file focuses on using decryption to reuse the encrypted authorization token to refetch user data from GitHub.


import { Request, Response } from 'express';
import { getUserById } from '../../lib/prisma/get-user-by-id.js';
import { Unauthorized } from 'custom-exceptions-express';

export const getPermittedUserData = async(req: Request, res: Response)=>{
    const {userId} = (req as any).userId //$ Assuming that authorization middleware was successful.

    const user = await getUserById(userId)

    if(!user) throw new Unauthorized('User not associated with this JWT token.')
    
    const accessToken = 
}