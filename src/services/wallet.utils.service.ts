// export const getBalance = async (address: string) => {
//   try {
//     const balance = await web3.eth.getBalance(address);
//     return web3.utils.fromWei(balance, "ether");
//   } catch (err) {
//     console.log(err);
//   }
// };

import Web3 from "web3";

const INFURA_URL =
  "https://mainnet.infura.io/v3/a9bb27c0b15f4c9590eaa7d964dffe8f";
// Test용으로 그냥 선언

const PASSWORD: string = "PASSWORD"; // dummyPassword
const SALT: string = "SALT";

export const getWeb3Instance = (): Web3 => {
  return new Web3(INFURA_URL);
};

export const getWalletBalance = async (address: string): Promise<number> => {
  const web3Client = getWeb3Instance();
  const weiBalance = await web3Client.eth.getBalance(address);
  return Number(web3Client.utils.fromWei(weiBalance, "ether"));
};
