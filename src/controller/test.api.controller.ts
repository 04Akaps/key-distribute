import { SampleApiRequest } from "../message/sample.api.request";
import { SampleApiResponse } from "../message/sample.api.response";
import {
  ExpressRequest,
  ExpressResponse,
} from "../types/extensions/express.extension";

export const sampleApi = async (req: ExpressRequest, res: ExpressResponse) => {
  await SampleApiRequest.validate(req);
  const request = new SampleApiRequest(req);
  const response = new SampleApiResponse(request.name);
  return response.send(res);
};
