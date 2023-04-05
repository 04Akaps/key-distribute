import { utils, ethers, Signer, Wallet as WalletSigner } from "ethers";
import ss from "secrets.js-grempe";

const shares = 6;
const threshold = 4;

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
