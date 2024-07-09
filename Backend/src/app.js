import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

// app.use(cors());

app.use(cors({
  // origin: process.env.CORS_ORIGIN,
  origin: "https://lockmate.vercel.app/",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




//import route

import userRoute from "./routes/user.route.js";

app.use("/api/v1/users",userRoute);

import passwordRoute from "./routes/savedpassword.route.js";

app.use("/api/v1/passwords",passwordRoute);






export default app;