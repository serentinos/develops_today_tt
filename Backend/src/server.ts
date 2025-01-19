import cors from "cors";
import express, { type Express } from "express";
import { env } from "@/utils/envConfig";
import requestLogger from "@/middlewares/requestLogger";
import errorHandler from "@/middlewares/errorHandler";
import pino from "pino";
import { countriesRouter } from "./routes/countries/countriesRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

app.use(requestLogger);

app.use("/countries", countriesRouter);

app.use(errorHandler());

export { app, logger };
