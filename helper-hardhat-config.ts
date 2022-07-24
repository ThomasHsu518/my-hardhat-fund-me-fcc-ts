type NetworkConfigType = {
  [propName: string]: {
    ethUsdPriceFeedAddress: string;
    blockConfirmations?: number;
  };
};

export const netWorkConfig: NetworkConfigType = {
  rinkeby: {
    ethUsdPriceFeedAddress: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    blockConfirmations: 6,
  },
};

export const developmentChains = ["hardhat", "localhost"];
export const DECIMALS = 8;
export const INITIAL_ANSWER = 200000000000;
