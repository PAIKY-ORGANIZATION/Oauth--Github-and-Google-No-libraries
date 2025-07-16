import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { githubCallback } from "../controllers/github-auth/github-callback.js";
import { githubRedirect } from "../controllers/github-auth/github-redirect.js";
//*types:





export const router = Router();


router.get('/auth/github', validate(githubRedirect))
router.get('/auth/github/callback', validate(githubCallback) )

