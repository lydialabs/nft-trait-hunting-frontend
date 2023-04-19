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
  "archway1c0gnfqf4hjz0juwkxt26y9uxvmkqpg84sgl76r2evvd9gy95yrzq88x69v";

export const TIERS = {
  1: { label: "common", color: "#727272", percentage: 0.5 },
  2: { label: "rare", color: "#c295e3", percentage: 0.3 },
  3: { label: "legendary", color: "#ffc100" },
};
