import { StatusCodes as HttpStatus } from "http-status-codes";
import { Response } from "express";
import { ApiStatus } from "../types/enums/api.status";

export class ApiResponse {
  status: ApiStatus;

  constructor(status: ApiStatus) {
    this.status = status;
  }

  send(res: Response, httpStatus: HttpStatus = HttpStatus.OK) {
    res.status(httpStatus).json(this);
  }

  static Schema = class {
    type: string;
    properties: object;

    constructor() {
      this.type = "object";

      this.properties = {
        status: {
          type: "number",
          description: "API Status Code",
        },
      };
    }

    toObject() {
      return {
        type: this.type,
        properties: this.properties,
      };
    }
  };
}

export class SuccessResponse extends ApiResponse {
  constructor() {
    super(ApiStatus.SUCCESS);
  }

  static Schema = class extends ApiResponse.Schema {
    //?? 왜 컴파일이..?
    constructor() {
      super();
    }
  };
}

export class ErrorResponse extends ApiResponse {
  message: string;

  constructor(status: ApiStatus, message: string) {
    super(status);
    this.message = message;
  }

  static Schema = class extends ApiResponse.Schema {
    constructor() {
      super();

      this.properties = {
        ...this.properties,

        message: {
          type: "string",
          description: "API Error Message",
        },
      };
    }
  };
}
