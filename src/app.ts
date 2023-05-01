import "./config/global.variables";
import "express-async-errors";

import express, { Express } from "express";
import startServer from "./config/server.start";
import requestLogger from "./logger/request.logger";
import corsHandler from "./cors/cors.handle";
import errorHandler from "./logger/error.logger";
import { testRouter, walletRouter } from "./router/index";
import { distributeAndEncryptoKey } from "./services";

const app: Express = express();
const port = parseInt(global.server_port || "80");

app.use(express.json());
app.use(requestLogger);
app.use(corsHandler);

app.use("/test", testRouter);
app.use("/wallet", walletRouter);
app.use(errorHandler);

distributeAndEncryptoKey(
  "0x571fab1e7f4d669b8cb4134147e73ab02ecdc0b0891807a1aa86bbef5c805db9"
);

export const httpServer = startServer(app, port);
