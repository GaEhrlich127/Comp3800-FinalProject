var Voting = artifacts.require("../contracts/Voting_Contract.sol");

module.exports = function(deployer, network, accounts){
    deployer.deploy(Voting, accounts[9], ['Ronald Reagan', 'Jimmy Carter'], {from: accounts[0], gas: 1500000});
}

