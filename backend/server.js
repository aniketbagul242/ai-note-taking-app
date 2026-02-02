import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
import aiRouter from "./routes/aiRoutes.js";


dotenv.config();
const PORT = process.env.PORT;

const app = express();


app.use(cors());
app.use(express.json()); // middleware

connectDB();


app.get("/", (req, res) => {
  res.status(200).send("Server is running ");
});


// api endpoint
app.use("/api/auth", userRouter);
app.use("/api/notes", noteRouter);
app.use("/api/ai", aiRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
