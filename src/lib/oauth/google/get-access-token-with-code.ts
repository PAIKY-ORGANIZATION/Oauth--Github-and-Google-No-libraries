import axios  from 'axios'
import { CALLBACK_PATH_GOOGLE } from '../../variables.js'

export const getGoogleAccessTokenByCode = async(code: string)=>{

        
        const redirectUriBase = process.env.LOCAL_SERVER_BASE_URL //$ Looks like "http://localhost:3001"
    
        //! This same one must be used in the router. Router by def. starts with "/api"
        const redirectUri = redirectUriBase + '/api' + CALLBACK_PATH_GOOGLE //$ Looks like "http://localhost:3001 + /api/auth/google/callback" 

    const tokenResponse = await axios.post(`https://oauth2.googleapis.com/token`, {
        code,
        client_id: process.env.CLIENT_ID_GOOGLE,
        client_secret: process.env.CLIENT_SECRET_GOOGLE,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
    })
    
    const {access_token} = tokenResponse.data

    return access_token
}