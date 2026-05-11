import express from "express";
import { registerHost, loginHost } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerHost);
router.post("/login", loginHost);

export default router;