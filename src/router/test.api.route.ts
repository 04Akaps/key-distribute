import express, { Router } from "express";
import { sampleApi } from "../controller/test.api.controller";

// configure api router and prefix
export const testRouter: Router = express.Router();

testRouter.route("/api/sample").post(sampleApi);
