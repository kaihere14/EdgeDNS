import { Router } from "express";

import { verifyJwt } from "../middleware/verifyJwt.js";
import { googleAuthCallback, googleAuthRedirect, logoutUser, verifyUser } from "../controllers/user.controller.js";

const router = Router();

// Example route for authentication
router.get("/redirect", googleAuthRedirect);
router.get("/callback", googleAuthCallback);
router.get("/userverify", verifyJwt, verifyUser);
router.post("/logout",  logoutUser);


export default router;
