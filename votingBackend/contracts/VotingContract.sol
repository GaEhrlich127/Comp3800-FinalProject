pragma solidity ^ 0.5.0;
pragma experimental ABIEncoderV2;
contract Voting_Contract
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
    function register(string[] memory vote, string memory information) public returns(address)
    {
       Voter memory newVoter = Voter({voterAddress:msg.sender,votes:vote,info:stringToBytes32(information)});
       voterList[msg.sender] = newVoter;
       voterAddressArray.push(msg.sender);
       return msg.sender;
    }
       
    function addCandidate(string memory candidateName) public
    {
        candidateList.push(candidateName);
    }
    
    function getVoterInformation(address adr) public view returns(string[] memory) 
    {
        return voterList[adr].votes;
    }
    function getAllVoterAddresses() public view returns (address[] memory)
    {
        return voterAddressArray;
    }
    
    function getCandidateList() public view returns(string[] memory) 
    {
        return candidateList;
    }
  
    /** 
     * @dev Convert string to bytes32.
     * @param source String source
     * @return result bytes32
     * Notes: 
     * - You need to convert movieName from string to bytes32
     * 
     * Lifted from Rating.sol used for the Movie Rating App in class
     */
    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
    
        assembly {
            result := mload(add(source, 32))
        }
    }
}