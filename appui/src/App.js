import React, { Component } from 'react';
import './App.css';
import { web3, NETWORK_TYPE, defaultAccount, ratingContract } from "./config";
import { CandidateTable } from "./CandidateTable";
import { WinnerResults } from "./WinnerResults";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const Tx = require('ethereumjs-tx').Transaction

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			candidates: [
				// { name: 'Ronald Reagan', ranking: 0 },
				// { name: 'Jimmy Carter', ranking: 0 },
				// { name: 'John B. Anderson', ranking: 0 },
				// { name: 'Ed Clark', ranking: 0 },
				// { name: 'Barry Commoner', ranking: 0 },
				{ name: 'Josh', ranking: 0 },
				{ name: 'Max', ranking: 0 },
				{ name: 'Janet', ranking: 0 },
				{ name: 'Jane', ranking: 0 },
			
			],
			hash: "",
			modal:false,
		}
		
		// Object.entries(this.state.candidates).forEach( ([index, currentCandidate]) => {
		// 	ratingContract.methods.getTotalVotes(currentCandidate.name).call().then( (votes) => { 
		// 		this.setState({
		// 			candidates:this.state.candidates.map(
		// 				(el)=>el.name===currentCandidate.name? Object.assign({},el,{ranking:votes}):el 
		// 			)
		// 		})
		// 	});
		// })

		this.updateRanking = this.updateRanking.bind(this);
		this.addCandidate = this.addCandidate.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	//Whenever an arrow is clicked, it'll update the state to represent the new ranking
	updateRanking(candidate, newRanking) {
		this.setState({candidates:this.state.candidates.map(
			(el)=>el.name===candidate.name ? Object.assign({},el,{ranking: Number(newRanking)}) : el
		)});
	}
	
	//Add a new Candidate to the table
	addCandidate(newCandidate){
		//This is all going to be deprecated, this is just JS but will need to use the smart contract when possible

		//Check for a duplicate
		let duplicateCandidate=false;
		for(let i=0;i<this.state.candidates.length;i++){
		const nameCheck=this.state.candidates[i];
		if(nameCheck.name.toLowerCase() === newCandidate.toLowerCase()) {duplicateCandidate=true;break;}
		}

		//If there is a duplicate, ignore it
		//If it's not a duplicate, add it to the table
		if(duplicateCandidate===false){
		let tempCandidates=this.state.candidates;
		tempCandidates.push({name:newCandidate,ranking:0});
		this.setState({
			candidates:tempCandidates
		});
		}

	}

	toggleModal(){this.setState({modal:!this.state.modal});}

	render() {
		return (
			<div className="App">
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
				/>
				<p className="App-intro">
					Ranked Choice Voting Application in Ethereum and React
				</p>
				<div className="candidate-table">
					<CandidateTable candidates={this.state.candidates} updateRanking={this.updateRanking} addCandidate={this.addCandidate}/>
				</div>
				<div className="uploadDiv">
					<label className="label">Please upload your Unique Identifying File here:</label>
					<input type="file" id="biometrics" onChange={(e)=>{
						const image=e.target.files[0];
						const reader=new FileReader();
						reader.onloadend=()=>{
							this.setState({hash:reader.result.split(",")[1]});
							let hasher=require('hash.js');
							this.setState({hash:hasher.sha512().update(this.state.hash).digest('hex')});
						}
						reader.readAsDataURL(image);
					}}/>
				</div>
				<div className="submitDiv">
					<Button color='success' className="submitButton"onClick={()=>{
						if(this.state.hash!==""){
							let validInfo=true;
							this.state.candidates.forEach((candidate)=>{
								this.state.candidates.forEach((candidate2)=>{
									if(candidate.name===candidate2.name){}
									else if(candidate.ranking!==0){
										if(candidate.ranking===candidate2.ranking){
											validInfo=false;
											console.log("Problem at "+candidate.name+" and "+candidate2.name);
										}
									}
								})
							})
							if(validInfo===false){alert("A correction is needed with your rankings. No two candidates can be ranked the same value (excluding a ranking of 0)");}
							else{
								alert("Sending your vote into the blockchain!");
							}
						}
						else{alert("Please upload your Unique Identifying Document")}
					}}
					>
						Submit Vote
					</Button>

					<Button className="resultsButton" color="warning" onClick={this.toggleModal}>See Current Results</Button>
					
					<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
						<ModalBody><WinnerResults candidates={this.state.candidates}/></ModalBody>
					</Modal>
				</div>
			</div>
		);
	}
}
export default App;
