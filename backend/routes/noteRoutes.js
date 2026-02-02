import express from "express";
import { createNote, deleteNote, getNotes,updateNote } from "../controllers/noteContoller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const noteRouter = express.Router();

noteRouter.post("/create", authMiddleware, createNote);
noteRouter.get("/get",authMiddleware, getNotes);
noteRouter.put("/:id",authMiddleware, updateNote);
noteRouter.delete("/:id",authMiddleware, deleteNote);



export default noteRouter;
