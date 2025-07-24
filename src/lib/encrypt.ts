
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'


//% The initialization vector (IV) must be RANDOM, per-encryption-unique and can be public.
//% It ensures that the same plaintext will always produce different ciphertexts, avoiding "guessing" because of repetitive patterns.
//% it's usually publicly sent along with encrypted communication; In this case we will store it in the database.


const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')



export const encrypt = (authToken: string)=>{
    
    const iv =  randomBytes(16) // - Read the top 

    const cipher = createCipheriv('aes-256-cbc', key, iv)


    const encrypted = cipher.update(authToken, 'utf-8', 'hex') + cipher.final('hex')

    return {encrypted, iv: iv.toString('hex')} 
}



export const decrypt = (encrypted: string, ivString: string) => {

    const iv = Buffer.from(ivString, 'hex')


    const decipher = createDecipheriv('aes-256-cbc', key, iv)

    const decrypted = decipher.update(encrypted, 'hex', 'utf-8') + decipher.final('utf-8')

    return decrypted
}