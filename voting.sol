pragma solidity ^ 0.5.0;
pragma experimental ABIEncoderV2;
contract Vote
{
    struct Voter
    {
        address voterAddress;
        string[] votes;//change from mapping to array
        bool hasVoted;
        bytes32 info;
    }
    mapping(string => uint)  tempCandidate;
    address[] voterAddressArray;
    string[] candidateList;
    mapping(address => Voter) voterList;
    address Manager;
    
    constructor(address _manager, string[] memory _candidateList) public
    {
        Manager = _manager;
        candidateList = _candidateList;
    }
    
    function vote(string[] memory votingPreference) public
    {
       
        uint i = 0;
        for(i = 0; i < votingPreference.length; i++)
        {
            voterList[msg.sender].votes[i] = votingPreference[i];
        }
        voterAddressArray.push(msg.sender);
        
    }
    
    function compareStrings(string memory a, string memory b) public view returns (bool) //referenced off stack overflow
    {
   
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    
    }   

    function finalizeVote() public
    {
       
        for(uint i = 0; i < candidateList.length;i++)
        {
            tempCandidate[candidateList[i]] = 0;//initialize mapping
        }
        for(int currentMaxPreference=0; currentMaxPreference<candidateList.length; currentMaxPreference++){

	        //Iterate through each voter
            for(int voterIndex=0; voterIndex<voterAddressArray.length;i++){
		        Voter memory currentVoter = voterList[voterIndex];
		        boolean voteCast=false;

		    //Iterate through the currentVoters vote Preference
		        for(int voterPreference=0; voterPreference<currentVoter.votes.length; voterPreference++){
		            if(voteCast==true){break;}
		            
		            if(voterPreference > currentMaxPreference){break;}
		            
			        if(tempCandidate[candidateList[i]]<0){
				       
				       continue;
			        }
			        else{
				        tempCandidate[candidateList[i]]++;
				        voteCast=true;
			        }
			        
		        }
            }

            //Eliminate the lowest voted candidate
	        string[] eliminatedCandidates;
	        //Start by assuming that the minimum votes achieved were the maximum possible
	        int lowVotes=voterList.length;

	        //Traverse through each candidates votes
            for(int i=0;i<candidateList.length;i++){
		            string currentCandidate=candidateList[i];
		
		            //If the current candidate matched the low vote, push them onto the eliminated group
		            if(tempCandidate[currentCandidate]==lowVotes){
		                
			            eliminatedCandidates.push(currentCandidate);
		            }
		            //If someone got lower, mark the new low vote, clear the eliminated group, and add them to the empty pile
		            else if(tempCandidate[currentCandidate]  <lowVotes && tempCandidate[currentCandidate]>=0){
		                
			            lowVotes=tempCandidate[currentCandidate];
			            
			            for(int j=eliminatedCandidates.length-1;j>=0;j++){
			                
				            delete eliminatedCandidate[j]; 
			            	eliminatedCandidate.length--;
			            }
			            eliminatedCandidates.push(currentCandidate);
		            }
                }

	    //After, mark all the eliminated Candidates as such
	       for(int i=0;i<eliminatedCandidates.length;i++){
	           
		        tempCandidate[eliminatedCandidates[i]]=-1;
	        }
	        for(int i=0;i<candidateList.length;i++){
                if(tempCandidate[candidateList[i]]>=0){
                    tempCandidate[candidateList[i]]=0;
                }
            }
        }
        for(int i=0;i<candidateList.length;i++){
	        if(tempCandidate[candidateList[i]]>0){
		    //Do something here... This is the winner!
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