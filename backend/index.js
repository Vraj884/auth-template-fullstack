import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.js"; // Assuming auth.ts will be compiled to auth.js

import { connectDB } from "./db.connect.js"; // Assuming db.connect.ts will be compiled to db.connect.js

dotenv.config();
const app = express();


app.use(cors({
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true                 // Allows cookies
}));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT;

connectDB();


app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});