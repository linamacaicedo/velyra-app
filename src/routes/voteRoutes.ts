import express from "express";

import { createVote } from "../controllers/voteController";

const router = express.Router();

router.post("/", createVote);

export default router;
