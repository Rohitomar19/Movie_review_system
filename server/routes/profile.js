import express from "express";
import {
  handleGetProfile,
  handleUpdateUser,
  handleAdminPage,
} from "../controllers/profile.js";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/user-info", handleGetProfile);
router.post("/user-info/update", handleUpdateUser);
router.get("/admin", checkAdmin, handleAdminPage);

export default router;
