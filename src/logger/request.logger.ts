import morgan from "morgan";
import { Request, Response } from "express";

import path from "path";
import createLogger from "./create.logger";

// configure logger
const filename = path.basename(__filename);
const logger = createLogger(filename);

// configure custom log formats
const tinyLogFormat =
  ":method :url HTTP/:http-version :status :res[content-length] :response-time ms";
const combinedLogFormat = `:remote-addr :remote-user :referrer :user-agent ${tinyLogFormat}`;

const logFormat = combinedLogFormat;

const logOptions: morgan.Options<Request, Response> = {
  stream: {
    write(message: string) {
      // line이 꺠지는 걸 방지하기 위해서
      logger.http(message.trimEnd());
    },
  },
};

const requestLogger = morgan(logFormat, logOptions);
export default requestLogger;
