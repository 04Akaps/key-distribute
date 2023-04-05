import { WalletCreateRequest } from "../message/wallet.api.request";
import {
  ExpressRequest,
  ExpressResponse,
} from "../types/extensions/express.extension";
import * as walletService from "../services";

export const createWallet = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  //   await WalletCreateRequest.validate(req);

  // 들어오는 sns_id, chainId를 통해 인스턴스를 만들어 준다.
  const request = new WalletCreateRequest(req);
  const newWallet = await walletService.createNewWallet();
  // 새로운 지갑 생성

  console.log(newWallet);

  const checkWalletBalance = await walletService.getWalletBalance(
    newWallet.address
  );

  console.log(checkWalletBalance);
};
