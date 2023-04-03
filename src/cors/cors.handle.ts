// cors handler를 작업 해야 함

import cors from "cors";
import { Request } from "express";

const customCorsOptions = (req: Request, callback: any) => {
  return callback(null, {
    origin: true,
  });
};

const corsHandler = cors(customCorsOptions);

export default corsHandler;
