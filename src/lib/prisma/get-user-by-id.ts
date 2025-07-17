import { prisma } from "./prisma-client.js"


export const getUserById = async(userId: string)=>{

    return  await prisma.user.findFirst({
        where: {id: userId}
    })

}