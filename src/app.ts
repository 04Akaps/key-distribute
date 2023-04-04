import "./global.variables";
import "express-async-errors";

import express, { Express } from "express";
import startServer from "./server.start";
import requestLogger from "./logger/request.logger";
import corsHandler from "./cors/cors.handle";
import errorHandler from "./logger/error.logger";
import { testRouter } from "./router/index";

const app: Express = express();
const port = parseInt(global.server_port || "80");

app.use(express.json());
app.use(requestLogger);
app.use(corsHandler);

app.use("/test", testRouter);
app.use(errorHandler);

export const httpServer = startServer(app, port);
