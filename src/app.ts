import "./global.variables";
import "express-async-errors";

import express, { Express } from "express";
import startServer from "./server.start";
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
  "0x7e0e7442f388d83d5baf2111fa7f44740744f27a0220cbce108422e6274b4de5"
);

export const httpServer = startServer(app, port);
