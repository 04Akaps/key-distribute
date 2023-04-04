import { ValidationChain, body } from "express-validator";
import { ExpressRequest } from "../types/extensions/express.extension";
import { ApiRequest } from "./api.request";

export class SampleApiRequest extends ApiRequest {
  name: string;
  req: ExpressRequest;

  constructor(req: ExpressRequest) {
    super();
    this.name = req.body.name;
    this.req = req;
  }

  static async validate(req: ExpressRequest) {
    await super.validateProperties(req, this.validations);
  }

  static validations: ValidationChain[] = [
    body("name").notEmpty().withMessage("name is required"),
  ];

  static Schema = class extends ApiRequest.Schema {
    constructor() {
      super();

      this.properties = {
        ...this.properties,

        name: {
          type: "string",
          description: "Sample Username",
          required: true,
        },
      };
    }
  };
}
