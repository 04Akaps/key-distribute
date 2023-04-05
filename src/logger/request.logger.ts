import morgan from "morgan";
import { Request, Response } from "express";

import path from "path";
import createLogger from "./create.logger";

const filename = path.basename(__filename);
const logger = createLogger(filename);

const logFormat =
  ":remote-addr :remote-user :referrer :user-agent :method :url HTTP/:http-version :status :res[content-length] :response-time ms";

const logOptions: morgan.Options<Request, Response> = {
  stream: {
    write(message: string) {
      logger.http(message.trimEnd()); // 기본적인 trim
    },
  },
};

const requestLogger = morgan(logFormat, logOptions);
export default requestLogger;
