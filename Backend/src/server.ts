import cors from "cors";
import express, { type Express } from "express";
import { env } from '@/utils/envConfig'
import requestLogger from "@/middlewares/requestLogger";
import errorHandler from "@/middlewares/errorHandler";
import pino from "pino";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

// Request logging
app.use(requestLogger);

// Error handlers
app.use(errorHandler());

export { app, logger };