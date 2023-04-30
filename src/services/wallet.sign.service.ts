import chains from "../consts/chains";
import { TransactionSignRequest } from "../message/wallet.api.request";
import { ExpressRequest } from "../types/extensions/express.extension";
import { ethers, Wallet as WalletSigner } from "ethers";
import { decryptAndRestoreKey } from "./wallet.utils.service";

export const signAndSendTransaction = async (req: ExpressRequest) => {
  const txRequest = new TransactionSignRequest(req);
  console.log(txRequest);

  const chainConfig = chains.get(txRequest.chainId);

  if (!chainConfig) {
    console.error("Invalid chain Id");
    return null;
  }

  const nonce = await chainConfig.nonce(txRequest.from);
  const block = await chainConfig.provider.getBlock("latest");
  const value = ethers.utils.parseEther(txRequest.value);

  const estimateGas = await chainConfig.provider.estimateGas({
    from: txRequest.from,
    to: txRequest.to,
    data: txRequest.data,
    value: value,
  });

  const tx = {
    from: txRequest.from,
    type: 2, // EIP-1559를 위해서
    nonce: nonce,
    to: txRequest.to,
    data: txRequest.data,
    value: value,
    chainid: txRequest.chainId,
    gasLimit: Number(estimateGas) * 1.2,
  };

  const pk = await decryptAndRestoreKey(txRequest.shares);

  const signer = new WalletSigner(pk, chainConfig.provider);
  const signedTx = await signer.signTransaction(tx);

  const txHash = await (
    await chainConfig.provider.sendTransaction(signedTx)
  ).hash;

  const receipt = await chainConfig.provider.waitForTransaction(txHash);
  return receipt;
};
