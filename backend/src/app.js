import express from "express";
import cors from "cors";
import roomRoutes from "./routes/roomRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/rooms", roomRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/user", userRoutes);

export default app;
