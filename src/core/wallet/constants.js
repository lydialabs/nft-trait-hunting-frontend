export const ChainInfo = {
  chainId: "constantine-2",
  chainName: "Constantine Testnet",
  rpc: "https://rpc.constantine-2.archway.tech",
  rest: "https://api.constantine-2.archway.tech",
  stakeCurrency: {
    coinDenom: "CONST",
    coinMinimalDenom: "uconst",
    coinDecimals: 6,
  },
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "archway",
    bech32PrefixAccPub: "archwaypub",
    bech32PrefixValAddr: "archwayvaloper",
    bech32PrefixValPub: "archwayvaloperpub",
    bech32PrefixConsAddr: "archwayvalcons",
    bech32PrefixConsPub: "archwayvalconspub",
  },
  currencies: [
    { coinDenom: "CONST", coinMinimalDenom: "uconst", coinDecimals: 6 },
  ],
  feeCurrencies: [
    { coinDenom: "CONST", coinMinimalDenom: "uconst", coinDecimals: 6 },
  ],
  coinType: 118,
  gasPriceStep: { low: 0, average: 0.1, high: 0.2 },
  features: ["cosmwasm"],
};

export const CONTRACT_ADDRESS =
  "archway1j6ay2euavv5cs9nctlxtw3424ysmltat763039wgvdrqw2gd3k3q8f7xu7";

export const TIERS = {
  1: "common",
  2: "rare",
  3: "legendary",
};
