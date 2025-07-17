
import { createDecipheriv, randomBytes } from 'node:crypto'



export const encrypt = (authToken: string)=>{

    const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')
    
    
    const fixedIv = randomBytes(12)
    
    const cipher = createDecipheriv('aes-256-cbc', key, fixedIv)


    const encrypted = cipher.update(authToken, 'utf-8', 'hex') + cipher.final('hex')
    
    console.log(encrypted);
    

    return encrypted 
}



