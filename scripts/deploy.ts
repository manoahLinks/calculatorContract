import { ethers } from "hardhat";

async function main() {

  const calculator = await ethers.deployContract("CalculatorContract");

  await calculator.waitForDeployment();

  console.log(
    `CalculatorContract successfully deployed to ${calculator.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
