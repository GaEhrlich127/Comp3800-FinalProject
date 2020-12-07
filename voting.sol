pragma solidity ^ 0.5.0;
pragma experimental ABIEncoderV2;
contract Vote
{
    struct Voter
    {
        address voterAddress;
        string[] votes;
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
       require(msg.sender != Manager,"Only a voter can vote!");
       Voter memory newVoter = Voter({voterAddress:msg.sender,votes:vote,info:information});
       voterList[msg.sender] = newVoter;
       voterAddressArray.push(msg.sender);
       
        
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