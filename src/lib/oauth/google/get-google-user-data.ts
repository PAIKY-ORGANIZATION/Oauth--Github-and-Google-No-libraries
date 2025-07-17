import axios from 'axios'

export const getGoogleUserDataByToken = async(accessToken: string)=>{

     const {data} = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
    

    return data
}