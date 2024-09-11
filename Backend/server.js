import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import { connectDB } from "./config/db.js";
import cors from 'cors';

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/User",userRoutes);
app.use("/api/Company",companyRoutes);
app.listen(port, () => {
    connectDB();
    console.log(`Server started at port http://localhost:${port}`);
  });