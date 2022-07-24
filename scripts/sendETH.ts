import { task } from "hardhat/config"

task("sendETH", "Send ETH to MetaMask Account1").setAction(
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()
    const res = await accounts[0].sendTransaction({
      to: "0xF787E9DFF38D1686289989b551eDbA6Ab8aF48f9",
      value: hre.ethers.utils.parseEther("1000"),
    })
    console.log(res)
  }
)

export default {}
