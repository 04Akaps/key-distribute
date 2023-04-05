import { ApiStatus } from "../types/enums/api.status";

import {
  ExpressError,
  ExpressRequest,
  ExpressResponse,
} from "../types/extensions/express.extension";

import { StatusCodes as HttpStatus } from "http-status-codes";
import path from "path";
import createLogger from "./create.logger";
import { NextFunction } from "express";
import { ApiError } from "../types/error/api.error";
import { ErrorResponse } from "../message/api.reponse";

const filename = path.basename(__filename);
const logger = createLogger(filename);

const errorHandler = (
  err: ExpressError,
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction
) => {
  // 추가 처리 필요
  if (err instanceof ApiError) {
    const response = new ErrorResponse(err.apiStatus, err.message);
    return response.send(res, err.httpStatus);
  }

  // 로그 찍어주고
  logger.error("알수 없는 서버 에러,", err);
  const response = new ErrorResponse(ApiStatus.FAILED, err.message);
  return response.send(res, HttpStatus.INTERNAL_SERVER_ERROR);
};

export default errorHandler;
