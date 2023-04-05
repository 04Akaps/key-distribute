import { ethers, Wallet } from "ethers";

export const createNewWallet = async () => {
  const entropy = ethers.utils.randomBytes(16);
  // getRandom Bytes

  const wallet = Wallet.createRandom(entropy);
  // Create Random

  return {
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
};
