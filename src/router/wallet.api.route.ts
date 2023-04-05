import express, { Router } from "express";
import { createWallet } from "../controller/wallet.api.controller";

export const walletRouter: Router = express.Router();

walletRouter.route("/createWallet").post(createWallet);
