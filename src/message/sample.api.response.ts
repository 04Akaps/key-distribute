import { SuccessResponse } from "./api.reponse";

export class SampleApiResponse extends SuccessResponse {
  greeting: string;

  constructor(name: string) {
    super();
    this.greeting = `Test, ${name}`;
  }

  static Schema = class extends SuccessResponse.Schema {
    constructor() {
      super();

      this.properties = {
        ...this.properties,

        greeting: {
          type: "string",
          description: "Username",
        },
      };
    }
  };
}
