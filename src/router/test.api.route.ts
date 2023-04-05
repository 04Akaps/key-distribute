import express, { Router } from "express";
import { sampleApi } from "../controller/test.api.controller";

export const testRouter: Router = express.Router();

testRouter.route("/sample").post(sampleApi);
