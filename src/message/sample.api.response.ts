import { SuccessResponse } from "./api.reponse";

export class SampleApiResponse extends SuccessResponse {
  greeting: string;

  constructor(name: string) {
    super();
    this.greeting = `hello, ${name}`;
  }

  static Schema = class extends SuccessResponse.Schema {
    constructor() {
      super();

      this.properties = {
        ...this.properties,

        greeting: {
          type: "string",
          description: "Greeting Message from Username",
        },
      };
    }
  };
}
