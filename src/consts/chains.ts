import { providers } from "ethers";

export interface IChainConfig {
  provider: providers.JsonRpcProvider;
  nonce: (address: string) => Promise<number>;
}
const chains = new Map<number, IChainConfig>();

chains.set(1, {
  provider: new providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/a9bb27c0b15f4c9590eaa7d964dffe8f"
  ),
  nonce: async (address) =>
    (await chains.get(1)?.provider.getTransactionCount(address, "pending")) ||
    0,
});

chains.set(5, {
  provider: new providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/5S8HXVwGm9ON_zm5eYs9YZgCF48lZSgK"
  ),
  nonce: async (address) =>
    (await chains.get(5)?.provider.getTransactionCount(address, "pending")) ||
    0,
});

chains.set(137, {
  provider: new providers.JsonRpcProvider("https://polygon-rpc.com"),
  nonce: async (address) =>
    (await chains.get(137)?.provider.getTransactionCount(address, "pending")) ||
    0,
});

chains.set(8217, {
  provider: new providers.JsonRpcProvider("https://gateway.klaykingdoms.com/"),
  nonce: async (address) =>
    (await chains
      .get(8217)
      ?.provider.getTransactionCount(address, "pending")) || 0,
});

chains.set(1001, {
  provider: new providers.JsonRpcProvider(
    "https://public-node-api.klaytnapi.com/v1/baobab"
  ),
  nonce: async (address) =>
    (await chains
      .get(1001)
      ?.provider.getTransactionCount(address, "pending")) || 0,
});

export default chains;
