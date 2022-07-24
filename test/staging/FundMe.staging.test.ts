import { ethers, network, getNamedAccounts } from "hardhat";
import { FundMe } from "../../typechain-types";
import { assert } from "chai";
import { developmentChains } from "../../helper-hardhat-config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      const valueAmount = ethers.utils.parseEther("0.01");
      let deployer: SignerWithAddress;
      let fundMe: FundMe;
      describe("fund", async () => {
        beforeEach(async () => {
          const accounts = await ethers.getSigners();
          deployer = accounts[0];
          fundMe = await ethers.getContract("FundMe", deployer);
        });
        it("deployer can fund", async function () {
          // Arrange
          const startingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );

          // Act

          const transactionResponse = await fundMe.fund({
            value: valueAmount,
          });

          const transactionReceipt = await transactionResponse.wait(1);

          // Assert

          const endingFundMeBalance = await fundMe.provider.getBalance(
            fundMe.address
          );

          assert.equal(startingFundMeBalance.toString(), "0");
          assert.equal(endingFundMeBalance.toString(), valueAmount.toString());
        });
      });
    });
