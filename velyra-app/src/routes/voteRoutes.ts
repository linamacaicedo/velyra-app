import express from "express";
import { createVote, getVotesBySession } from "../controllers/voteController";

const router = express.Router();

router.post("/", createVote);
router.get("/session/:sessionId", getVotesBySession);

export default router;