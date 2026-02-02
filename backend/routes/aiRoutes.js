import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { generateTags, improveNote, summarizeNote } from "../controllers/aiController.js";


const aiRouter = express.Router();

aiRouter.post("/summary", authMiddleware, summarizeNote);
aiRouter.post("/improve", authMiddleware, improveNote);
aiRouter.post("/tags", authMiddleware, generateTags);

export default aiRouter;
