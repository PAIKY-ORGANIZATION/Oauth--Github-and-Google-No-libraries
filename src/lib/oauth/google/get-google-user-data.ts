import axios from 'axios'

export const getGoogleUserDataByToken = async(accessToken: string)=>{

     const {data} = await axios.get<GoogleUserResponse>('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })


    const user = {   //* we use this specific structure so that it is compatible with Prisma "storeUser()" 
        username: data.given_name,
        email: data.email,
        isVerifiedEmail: data.verified_email, //* Boolean
        imageURL: data.picture,
        fullName: data.name,
        oauthProviderId: data.id
    }
    

    return user
}