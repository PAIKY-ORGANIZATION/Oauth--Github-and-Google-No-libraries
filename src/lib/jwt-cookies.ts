import { Unauthorized } from 'custom-exceptions-express'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'



export const generateJwtAndAddToResponse = (userId: string, res: Response)=>{

    const token =  jwt.sign({userId}, process.env.JWT_SECRET!, {
        expiresIn: '7d',  
    })

    res.cookie('SERVER_JWT', token, {
        httpOnly: true,
        sameSite: true
    })
}

export const getJwtFromRequestAndVerify = (req: Request)=>{
    const token: string | undefined = req.cookies['SERVER_JWT']

    if(!token) throw new Unauthorized('Missing token')


    try{
        
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {userId: string}
    
        return payload
        
    }catch(e){
        throw new Unauthorized('Invalid token')	
    }

}
