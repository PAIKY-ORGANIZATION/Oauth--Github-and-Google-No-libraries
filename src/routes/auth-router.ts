import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { githubCallback } from "../controllers/github-auth/github-callback.js";
import { redirectToGithub } from "../controllers/github-auth/redirect-to-github.js";
import { redirectToGoogle } from "../controllers/google-auth/redirect-to-google.js";
import { googleCallback } from "../controllers/google-auth/google-callback.js";
import { authorization } from "../middleware/authorization.js";
import { getPermittedUserData } from "../controllers/github-auth/get-permitted-user-data.js";
//*types:





export const router = Router();

//* Github:
router.get('/auth/github', validate(redirectToGithub))
router.get('/auth/github/callback', validate(githubCallback) )
router.get('/users/get-permitted-user-data', authorization, validate(getPermittedUserData))



//* Google
router.get('/auth/google', redirectToGoogle)
router.get('/auth/google/callback', googleCallback)