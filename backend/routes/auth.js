import express from "express";
import { signupUser } from "../controllers/signupUser.js";
import { loginUser } from "../controllers/loginUser.js";  
import { refreshAccessToken } from "../controllers/refreshToken.js";
import {logoutUser} from "../controllers/logout.js" 
import { checkAuth } from "../controllers/check.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/check", checkAuth);
router.post("/logout", logoutUser);

export default router;