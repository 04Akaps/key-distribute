import { Express } from "express";
import { Server as HttpServer } from "http";

const startServer = (app: Express, port: number) => {
  const httpServer: HttpServer = app.listen(port, () => {
    // logger로 넣어줘야 하나??
  });

  // and return http server
  return httpServer;
};

export default startServer;
