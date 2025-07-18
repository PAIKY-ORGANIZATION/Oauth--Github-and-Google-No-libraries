import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { redirectToGithub } from "../controllers/github-auth/redirect-to-github.js";
import { redirectToGoogle } from "../controllers/google-auth/redirect-to-google.js";
import { authorization } from "../middleware/authorization.js";
import { githubCallbackController } from "../controllers/github-auth/github-callback.js";
import { googleCallbackController } from "../controllers/google-auth/google-callback.js";
import { getUserDataWithStoredTokenController } from "../controllers/oauth-shared/get-oauth-user-data-with-stored-token.js";
//*types:





export const router = Router();

//* Github:
router.get('/auth/github', validate(redirectToGithub)) //$ ✅ Touched directly by clients
router.get('/auth/github/callback', validate(githubCallbackController)) //$ ❌ No touched directly by clients


//* Google
router.get('/auth/google', redirectToGoogle) //$ ✅ Touched directly by clients
router.get('/auth/google/callback', googleCallbackController) //$ ❌ No touched directly by clients




//* ONLY ONE FOR THE TWO
router.get('/users/data-from-stored-token', authorization, validate(getUserDataWithStoredTokenController)) //$ ✅ Touched directly by clients