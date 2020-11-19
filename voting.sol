pragma solidity ^ 0.5.0;
pragma experimental ABIEncoderV2;
contract Vote
{
    struct voter
    {
        address voterAddress;
        mapping(uint32 => bytes32) votes;
        bytes32 info;
    }
    string[] candidateList;
    mapping(address => bool) voterList;
    address Manager;
    
    constructor(address _manager, string[] memory _candidateList) public
    {
        Manager = _manager;
        candidateList = _candidateList;
    }
    
    function vote() public
    {
        
    }
    function finalizeVote() public
    {
        
    }
    function addCandidate(string memory candidateName) public
    {
        candidateList.push(candidateName);
    }
}