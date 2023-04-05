import { SuccessResponse } from "./api.reponse";

export class WalletCreateSuccessResponse extends SuccessResponse {
  shares: string;
  address: string;

  constructor(shares: string, addr: string) {
    super();
    this.shares = shares;
    this.address = addr;
  }

  static Schema = class extends SuccessResponse.Schema {
    constructor() {
      super();

      this.properties = {
        ...this.properties,

        shares: {
          type: "string",
          description: "encrypted shares to be store of this account",
        },
        address: {
          type: "string",
          description: "address of this account",
        },
      };
    }
  };
}

export class PkRecoveryResponse extends SuccessResponse {
  pk: string;

  constructor(pk: string) {
    super();
    this.pk = pk;
  }

  static Schema = class extends SuccessResponse.Schema {
    constructor() {
      super();

      this.properties = {
        ...this.properties,

        pk: {
          type: "string",
          description: "private key of requested account in requested chain",
        },
      };
    }
  };
}
