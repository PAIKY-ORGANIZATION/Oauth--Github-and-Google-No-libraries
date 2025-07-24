import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { redirectToGithub } from "../controllers/github-auth/redirect-to-github.js";
import { redirectToGoogle } from "../controllers/google-auth/redirect-to-google.js";
import { authorization } from "../middleware/authorization.js";
import { githubCallbackController } from "../controllers/github-auth/github-callback.js";
import { googleCallbackController } from "../controllers/google-auth/google-callback.js";
import { getUserDataWithStoredTokenController } from "../controllers/oauth-shared/get-oauth-user-data-with-stored-token.js";
import { CALLBACK_PATH_GITHUB, CALLBACK_PATH_GOOGLE } from "../lib/variables.js";
//*types:





export const router = Router();




//* Github:
router.get('/auth/github', validate(redirectToGithub)) //$ ✅ Touched directly by clients
//! CALLBACK_PATH_GITHUB must match the one in redirect-to-github.ts and the one set on Github app 
router.get(CALLBACK_PATH_GITHUB, validate(githubCallbackController)) //$ ❌ No touched directly by clients


//* Google
router.get('/auth/google', validate(redirectToGoogle)) //$ ✅ Touched directly by clients
//! CALLBACK_PATH_GOOGLE must match the one in redirect-to-google.ts and the one set on Google app 
router.get(CALLBACK_PATH_GOOGLE, validate(googleCallbackController)) //$ ❌ No touched directly by clients




//* ONLY ONE FOR THE TWO
router.get('/users/data-from-stored-token', validate(authorization), validate(getUserDataWithStoredTokenController)) //$ ✅ Touched directly by clients


//! This is for development without a front end. 
router.get('/home', (_req, res)=>{
    res.send('You are at home!')
})