
import { createCipheriv, randomBytes, createDecipheriv } from 'node:crypto'


const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')

// const iv = randomBytes(16)

const iv =  Buffer.from('A1B2C3D4E5F6G7H8', 'utf-8') //¡ We're not supposed to do this, neither what we did above. Supposed to store a random 4 for each access token that we save for it to persist across requests.

export const encrypt = (authToken: string)=>{

    
    
    const cipher = createCipheriv('aes-256-cbc', key, iv)

    const encrypted = cipher.update(authToken, 'utf-8', 'hex') + cipher.final('hex')

    return encrypted 
}



export const decrypt = (encrypted: string) => {
    const decipher = createDecipheriv('aes-256-cbc', key, iv)

    const decrypted = decipher.update(encrypted, 'hex', 'utf-8') + decipher.final('utf-8')

    return decrypted
}