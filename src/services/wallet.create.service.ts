import { utils, ethers, Signer, Wallet as WalletSigner } from "ethers";

export const createNewWallet = async () => {
  const entropy = ethers.utils.randomBytes(16);
  // getRandom Bytes

  const wallet = WalletSigner.createRandom(entropy);
  // Create Random

  return {
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
};
