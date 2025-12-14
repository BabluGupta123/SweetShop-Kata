import express from "express";
import auth from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";
import {
  increaseSweetQuantity,
  decreaseSweetQuantity,
  updateSweetPrice,
  buySweet,
  createSweet,
} from "../controllers/sweet.controller.js";

const router = express.Router();

//for user
router.post("/buy-sweet", auth, buySweet);

//for admin
router.post("/", auth, adminOnly, createSweet);
router.patch("/increase", auth, adminOnly, increaseSweetQuantity);
router.patch("/decrease", auth, adminOnly, decreaseSweetQuantity);
router.patch("/price", auth, adminOnly, updateSweetPrice);

export default router;
