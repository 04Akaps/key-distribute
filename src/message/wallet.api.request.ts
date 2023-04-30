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

export class TransactionSignRequest extends ApiRequest {
  shares: string; // db share값을 의미 -> 분산화되어 있는 키
  from: string; // from EOA
  to: string; // to EOA or CA
  value: string; // 전송하는 토큰의 양
  data: string; // 인코딩 된 데이터
  chainId: number; // 네트워크에 대한 chainId

  constructor(req: ExpressRequest) {
    super();
    this.shares = req.body.shares;
    this.from = req.body.from;
    this.to = req.body.to;
    this.value = req.body.value;
    this.data = req.body.data;
    this.chainId = req.body.chain_id;
  }

  static Schema = class extends ApiRequest.Schema {
    constructor() {
      super();

      this.properties = {
        ...this.properties,

        shares: {
          type: "string",
          description: "dh Share Error",
          required: true,
        },
        from: {
          type: "string",
          description: "From EOA",
          required: true,
        },
        to: {
          type: "string",
          description: "to EOA or CA",
          required: true,
        },
        value: {
          type: "string",
          description: "token value",
          required: true,
        },
        data: {
          type: "string",
          description: "encoded data",
          required: true,
        },
        chainId: {
          type: "number",
          description: "mainnet chainId",
          required: true,
        },
      };
    }
  };
}
