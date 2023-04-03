import "./global.variables";
import "express-async-errors";

import express, { Express } from "express";
import startServer from "./server.start";
const app: Express = express();
const port = parseInt(global.server_port || "80");

export const httpServer = startServer(app, port);
