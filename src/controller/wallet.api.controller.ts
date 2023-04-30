import {
  PkRecoveryRequest,
  WalletCreateRequest,
} from "../message/wallet.api.request";
import {
  ExpressRequest,
  ExpressResponse,
} from "../types/extensions/express.extension";
import * as walletService from "../services";
import {
  PkRecoveryResponse,
  TransactionSignResponse,
  WalletCreateSuccessResponse,
} from "../message/wallet.api.response";
import { ErrorResponse } from "../message/api.reponse";

import { ApiStatus } from "../types/enums/api.status";

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

  // 이제 PrivateKey에 대해서 Key를 분산하는 로직이 추가 되어야 한다.
  // 이 과정은 AWS서비스 및 DB작업이 필요하기 떄문에... 나중에 작업
  // 사실상 이 Node서버는 따로 구동시켜서 Key분산화에 대한 처리만 해도 된다.
  const response = new WalletCreateSuccessResponse(
    "분산된 값 중 하나의 Material 값",
    newWallet.address
  );

  return response.send(res);
};

export const recoverPk = async (req: ExpressRequest, res: ExpressResponse) => {
  const recoverRequest = new PkRecoveryRequest(req);

  // 해당 과정에서는 이제 req에 있는 snsId를 기준으로 다른 서비스에서 추가적인 Material을 가져 와야 한다.
  // 다른 서비스에 있는 Material은 A라고 가정하면 다음과 같은 형태로 전달해 주어야 한다.

  const A = `[{"iv" : "abc", "encrypShare" :"Sample Material"}, {"iv" : "abc", "encrypShare" :"Sample Material"}]`; // 당연히 해당 값은 암호화되어 있는 값이 될 것이다.
  // 또한 형태가 [{},{}] 형태로 구성 되어 있기 떄문에 현재는 오류가 발생할 코드이지만,

  const parseA = JSON.parse(A);
  const parseB = JSON.parse(recoverRequest.dbShare);

  const totalMaterial = [...parseA, ...parseB];

  const privateKey = await walletService.decryptAndRestoreKey(
    JSON.stringify(totalMaterial)
  );
  // 이러면 PrivateKey가 등장할 것이다
  // 이해가 안가면 app.ts 파일에 적혀있는 예시 PrivateKey가 어떻게 동작하는지 확인하면 된다.

  const response = new PkRecoveryResponse(privateKey);
  return response.send(res);
};

/**
 * @description Transaction을 서명하는 controller
 * @param req
 * @param res
 * @returns
 */

export const signTransaction = async (
  req: ExpressRequest,
  res: ExpressResponse
) => {
  const receipt = await walletService.signAndSendTransaction(req);
  console.log("Tx Receipt: ", receipt);

  const response = new TransactionSignResponse(JSON.stringify(receipt));
  return response.send(res);
};
