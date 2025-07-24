import {  Request, Response } from 'express';
import { getJwtFromRequestAndVerify } from '../lib/jwt-cookies.js';

export const authorization = async(req: Request, _res: Response)=>{
    //* This sends "Unauthorized" autonomously if needed
    const {userId} = getJwtFromRequestAndVerify(req);

    (req as any).userId = userId

}