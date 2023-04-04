import { body, ValidationChain, validationResult } from "express-validator";

import { ExpressRequest } from "../types/extensions/express.extension";
import { InvalidParameterError } from "./api.error";

export class ApiRequest {
  static async validateProperties(
    req: Request,
    validations: ValidationChain[]
  ) {
    // execute express-validator chains
    await Promise.all(validations.map((v) => v.run(req)));

    // check validation results
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw InvalidParameterError.fromValidation(errors.array());
    }
  }

  static Schema = class {
    type: string;
    properties: object;

    constructor() {
      this.type = "object";
      this.properties = {};
    }

    toObject() {
      return {
        type: this.type,
        properties: this.properties,
      };
    }
  };
}
