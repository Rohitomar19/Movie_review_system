import express from "express";
import {handleSignUp,handleSignIn,handleLogout,handleForgotPassword,handleResetPassword,handleChangeRole} from "../controllers/user.js";
import { checkUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.post("/logout", handleLogout);
router.post("/forgot-password", handleForgotPassword);
router.post("/reset-password", handleResetPassword);
router.post("/change-role", checkUser, handleChangeRole);

export default router;
