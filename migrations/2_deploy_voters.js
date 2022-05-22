const Voters = artifacts.require('../contracts/Voters.sol');

module.exports = function (deployer) {
  deployer.deploy(Voters);
};
