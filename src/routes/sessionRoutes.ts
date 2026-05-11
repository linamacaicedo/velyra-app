import express from "express";

import {
  createSession,
  getSessionsByHost,
  getDashboardStats,
  getSessionById,
  getSessionByCode,
  getSessionResults,
  closeSession,
} from "../controllers/sessionController";

const router = express.Router();

router.post("/", createSession);

router.get("/host/:hostId", getSessionsByHost);

router.get("/host/:hostId/stats", getDashboardStats);

router.get("/code/:code", getSessionByCode);

router.get("/:sessionId", getSessionById);

router.get("/:sessionId/results", getSessionResults);

router.put("/:sessionId/close", closeSession);

export default router;
