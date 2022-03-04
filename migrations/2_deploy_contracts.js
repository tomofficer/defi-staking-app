const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
  //deploy Mock Tether Contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  //deploy RWD Contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  //deploy DecentralBank Contract
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  //transfer all RWD tokens to Decentral bank
  await rwd.transfer(decentralBank.address, '1000000000000000000000000');

  //distribute 100 tether tokens to investor
  await tether.transfer(accounts[1], '100000000000000000000');
};
