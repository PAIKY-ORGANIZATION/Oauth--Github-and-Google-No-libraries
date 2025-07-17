import { Request, Response } from 'express';

export const redirectToGoogle = async(_req: Request, res: Response)=>{
    
    const googleClientId = process.env.GOOGLE_CLIENT_ID

    const redirectUri = "http://localhost:3001/api/auth/google/callback"

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`)


    //% If you only set the scope to "scope=email", you get:
    // {
    //     "id": "101846930506153227616",
    //     "email": "galaxycosmosy@gmail.com",
    //     "verified_email": true,
    //     "picture": "https://lh3.googleusercontent.com/a-/ALV-UjX15PmExmxbhySIl72PFOuEYPqOMOxsC_nSbWCah2y3_QD-zlk=s96-c"
    // }

    //% If you add "%20profile", you get:
    // {
    //     "id": "101846930506153227616",
    //     "email": "galaxycosmosy@gmail.com",
    //     "verified_email": true,
    //     "name": "Ariel Saez",
    //     "given_name": "Ariel",
    //     "family_name": "Saez",
    //     "picture": "https://lh3.googleusercontent.com/a/ACg8ocK2rg5bFVyXcUqiW0aUnWHCxEubpX5DvDsNBv_YLPXVCimML5U=s96-c"
    // }


}