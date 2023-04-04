import { ValidationError } from "express-validator";
import { ApiStatus } from "../types/enums/api.status";
import { ApiError } from "../types/error/api.error";

export class InvalidParameterError extends ApiError {
  constructor(message: string) {
    super(message, {
      apiStatus: ApiStatus.INVALID_PARAMETER,
    });
  }

  static fromValidation(errors: ValidationError[]) {
    const message = errors
      .map((e) => `${e.location}.${e.param} -> ${e.msg}`)
      .join("\n");
    return new InvalidParameterError(message);
  }
}
