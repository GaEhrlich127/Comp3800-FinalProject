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

     function compareStrings(string memory a, string memory b) public view returns (bool) //referenced from stack overflow
     {

    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));

    }   

    function finalizeVote() public
    {
         for(uint i = 0; i < voterAddressArray.length; i++)//loop through every voter
        {
            for(uint j =0; j < 1;j++)
            {
                if(compareStrings(voterList[voterAddressArray[i]].votes[0],candidateList[0]) == true)
                {
                    
                }
                else if(compareStrings(voterList[voterAddressArray[i]].votes[0],candidateList[1]) == true)
                {
                    
                }
                else if(compareStrings(voterList[voterAddressArray[i]].votes[0],candidateList[2]) == true)
                {
                    
                }
                else if(compareStrings(voterList[voterAddressArray[i]].votes[0],candidateList[3]) == true)
                {
                    
                }
                else if(compareStrings(voterList[voterAddressArray[i]].votes[0],candidateList[4]) == true)
                {
                    
                }
                
            }
        }
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