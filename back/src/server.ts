import express from "express";
import router from "./routes";
import morgan from 'morgan';
import cors from "cors"
import sessionMiddleware from "./config/sessionConfig";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(sessionMiddleware);
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(router)

export default app