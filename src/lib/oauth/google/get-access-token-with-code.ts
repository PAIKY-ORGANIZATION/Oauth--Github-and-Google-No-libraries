import axios  from 'axios'

export const getGoogleAccessTokenByCode = async(code: string)=>{

    const redirectUri = "http://localhost:3001/api/auth/google/callback"

    const tokenResponse = await axios.post(`https://oauth2.googleapis.com/token`, {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
    })
    
    const {access_token} = tokenResponse.data

    return access_token
}