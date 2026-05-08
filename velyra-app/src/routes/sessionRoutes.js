import express from "express";
import {
  createSession,
  getSessionsByHost,
  getSessionByCode,
  getSessionResults,
  closeSession
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", createSession);
router.get("/host/:hostId", getSessionsByHost);
router.get("/code/:code", getSessionByCode);
router.get("/:sessionId/results", getSessionResults);
router.put("/:sessionId/close", closeSession);

export default router;