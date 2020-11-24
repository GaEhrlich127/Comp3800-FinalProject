pragma solidity ^ 0.5.0;
pragma experimental ABIEncoderV2;
contract Vote
{
    struct voter
    {
        address voterAddress;
        //mapping(uint32 => bytes32) votes;
        string[] votes;
        bool hasVoted;
        bytes32 info;
    }
    string[] candidateList;
    mapping(address => voter) voterList;
    address Manager;
    
    constructor(address _manager, string[] memory _candidateList) public
    {
        Manager = _manager;
        candidateList = _candidateList;
    }
    
    function vote(string[] memory votingPreference) public
    {
       
        uint i = 0;
        for(i = 0; i < votingPreference.length;i++)
        {
            voterList[msg.sender].votes[i] = votingPreference[i];
        }
        
    }
    function finalizeVote() public
    {
        
    }
    function addCandidate(string memory candidateName) public
    {
        candidateList.push(candidateName);
       
        
    }
     function getCandidateList() public view returns(string[] memory) 
    {
        return candidateList;
    }
}