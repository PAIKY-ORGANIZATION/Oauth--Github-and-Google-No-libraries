
import { createCipheriv, randomBytes } from 'node:crypto'



export const encrypt = (authToken: string)=>{

    const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')
    
    const iv = randomBytes(16)
    
    const cipher = createCipheriv('aes-256-cbc', key, iv)

    const encrypted = cipher.update(authToken, 'utf-8', 'hex') + cipher.final('hex')

    return encrypted 
}



