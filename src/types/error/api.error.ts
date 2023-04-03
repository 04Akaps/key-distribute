import { ValidationError } from "express-validator";
import { StatusCodes as HttpStatus } from "http-status-codes";
import { ApiStatus } from "../enums/api.status";

export class ApiError extends Error {
  httpStatus: HttpStatus;
  apiStatus: ApiStatus;

  constructor(message: string, params: ApiErrorParams = {}) {
    super(message);
    this.httpStatus = params.httpStatus ?? HttpStatus.OK;
    this.apiStatus = params.apiStatus ?? ApiStatus.FAILED;
  }
}

interface ApiErrorParams {
  httpStatus?: HttpStatus;
  apiStatus?: ApiStatus;
}
