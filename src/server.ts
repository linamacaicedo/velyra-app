import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import voteRoutes from "./routes/voteRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Velyra Vote API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/sessions", sessionRoutes);

app.use("/api/votes", voteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
