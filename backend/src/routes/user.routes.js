import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  registerAdmin,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile", auth, getProfile);
router.post("/logout", logoutUser);

//admin registration
router.post("/register-admin", registerAdmin);
router.post("/admin-profile", auth, adminOnly, getProfile);

export default router;
