import "./global.variables";
import "express-async-errors";

import express, { Express } from "express";
import startServer from "./server.start";
import requestLogger from "./logger/request.logger";

const app: Express = express();
const port = parseInt(global.server_port || "80");

app.use(requestLogger);

export const httpServer = startServer(app, port);
