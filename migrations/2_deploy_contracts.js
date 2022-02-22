const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer) {
  //deploy Mock Tether Contract
  await deployer.deploy(Tether);

  //deploy RWD Contract
  await deployer.deploy(RWD);

  //deploy DecentralBank Contract
  await deployer.deploy(DecentralBank);
};
