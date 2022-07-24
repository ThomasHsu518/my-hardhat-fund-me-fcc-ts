import { developmentChains, netWorkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";
import { DeployFunction } from "hardhat-deploy/types";

const deployFundMe: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  network,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  let ethUsdPriceFeedAddress: string;

  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress =
      netWorkConfig[network.name]["ethUsdPriceFeedAddress"];
  }
  const args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args,
    log: true,
    // waitConfirmation: netWorkConfig[network.name]["blockConfirmations"] || 1,
  });
  if (!developmentChains.includes(network.name)) {
    await verify(fundMe.address, args);
  }
};

export default deployFundMe;
deployFundMe.tags = ["all", "fundMe"];
