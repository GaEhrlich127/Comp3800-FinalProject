var Voting = artifacts.require("../contracts/Voting_Contract.sol");

module.exports = function(deployer, network, accounts){
    deployer.deploy(Voting, accounts[9], ['Ronald Reagan', 'Jimmy Carter', 'John B. Anderson', 'Ed Clark', 'Barry Commoner'], {from: accounts[9], gas: 1000000});
}

