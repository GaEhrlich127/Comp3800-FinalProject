pragma solidity ^ 0.5.0;
pragma experimental ABIEncoderV2;
contract Vote
{
    struct Voter
    {
        address voterAddress;
        string[] votes;
        bool hasVoted;
        bytes32 info;
    }
    mapping(string => int)  tempCandidate;
    address[] voterAddressArray;
    string[] candidateList;
    mapping(address => Voter) voterList;
    address Manager;
    
    constructor(address _manager, string[] memory _candidateList) public
    {
        Manager = _manager;
        candidateList = _candidateList;
    }
    function register(string[] memory vote,bytes32 information) public 
    {
       Voter memory newVoter = Voter({voterAddress:msg.sender,votes:vote,hasVoted:false,info:information});
       voterList[msg.sender] = newVoter;
       
        
    }
    
    function vote(string[] memory votingPreference) public
    {
       
        require(voterList[msg.sender].hasVoted == false);
        require(msg.sender != Manager);
       
        for(uint i = 0; i < votingPreference.length; i++)
        {
            voterList[msg.sender].votes[i] = votingPreference[i];
        }
        
        
        voterAddressArray.push(msg.sender);
        voterList[msg.sender].hasVoted = true;
        
    }

     function overwriteVote() public
    {
        voterList[msg.sender].hasVoted == false;
        for(uint i = 0; i < voterList[msg.sender].votes.length; i++)
        {
            voterList[msg.sender].votes[i] = "";
        }
    }
    
    function compareStrings(string memory a, string memory b) private view returns (bool) //referenced off stack overflow
    {
   
       return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    
    } 
    
    function getVoterInformation(address) public view returns(string[] memory) 
    {
        return voterList[msg.sender].votes;
    }

    function getAllVoterAddresses() public view returns (address[] memory)
    {
        return voterAddressArray;
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