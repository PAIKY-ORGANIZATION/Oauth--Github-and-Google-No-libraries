import { prisma } from "./prisma-client.js";




export const storeUser = async({username, oauthProvider, oauthProviderId, email, oauthEncryptedAccessToken})=>{

    const user = await prisma.user.create({
        data: {
    
        }
    })
    

    return
}
