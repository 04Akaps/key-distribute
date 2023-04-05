import { ValidationChain, body } from "express-validator";
import { ExpressRequest } from "../types/extensions/express.extension";
import { ApiRequest } from "./api.request";

export class WalletCreateRequest extends ApiRequest {
  snsId: string;
  chainId: number;

  constructor(req: ExpressRequest) {
    super();
    this.snsId = req.body.sns_id;
    this.chainId = req.body.chain_id;
  }

  static async validate(req: ExpressRequest) {
    await super.validateProperties(req, this.validations);
  }

  static validations: ValidationChain[] = [
    body("sns_id").notEmpty().withMessage("id is required"),
    body("chain_id").notEmpty().withMessage("chain_id is required"),
  ];

  static Schema = class extends ApiRequest.Schema {
    constructor() {
      super();

      this.properties = {
        ...this.properties,

        userId: {
          type: "bigint",
          description: "Unique user id for wallet creation request",
          required: true,
        },
        chainId: {
          type: "int",
          description: "Requested blockchain to create user's wallet on",
          required: true,
        },
      };
    }
  };
}

export class PkRecoveryRequest extends ApiRequest {
  dbShare: string;
  chainId: number;
  snsId: string;

  constructor(req: ExpressRequest) {
    super();
    this.dbShare = req.body.db_share;
    this.chainId = req.body.chain_id;
    this.snsId = req.body.sns_id;
  }

  static async validate(req: ExpressRequest) {
    await super.validateProperties(req, this.validations);
  }

  static validations: ValidationChain[] = [
    body("sns_id").notEmpty().withMessage("id Error"),
    body("chain_id").notEmpty().withMessage("chain_id Error"),
  ];

  static Schema = class extends ApiRequest.Schema {
    constructor() {
      super();

      this.properties = {
        ...this.properties,

        userId: {
          type: "bigint",
          description: "userId",
          required: true,
        },
        chainId: {
          type: "int",
          description: "chainId",
          required: true,
        },
      };
    }
  };
}
