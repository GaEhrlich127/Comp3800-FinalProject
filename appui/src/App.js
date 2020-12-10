import React, { Component } from 'react';
import './App.css';
import { web3, NETWORK_TYPE, defaultAccount, voteContract } from "./config";
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
			],
			hash: "",
			modal:false,
			voteResults:{},
		}
		
		this.refreshCandidateList();
		this.refreshResults();

		this.updateRanking = this.updateRanking.bind(this);
		this.addCandidate = this.addCandidate.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}
	async refreshResults(){
        let output=voteContract.methods.getAllVoterAddresses().call().then( (allVotersWithDuplicates) => {
            let voterList=[...new Set(allVotersWithDuplicates)];
            let tempVoterList={};
            for(let i=0;i<voterList.length;i++){
                voteContract.methods.getVoterInformation(voterList[i]).call().then((currentVotersVotes)=>{
                    Object.assign(tempVoterList, {[voterList[i]]:currentVotersVotes})
                });
            }
            return tempVoterList;
		});
		output.then((result)=>{this.setState({voteResults:result});})
		console.log(this.state.voteResults);
    }

    async prepareState(){
        this.setState({voteResults:await this.refreshResults()});
    }

    async componentDidMount(){
        await this.prepareState();
    }

	refreshCandidateList(){
		voteContract.methods.getCandidateList().call().then( (candidates) => { 
			// console.log(candidates);
			let temp=this.state.candidates;
			for(let i=0;i<candidates.length;i++){
				let foundName=false;
				this.state.candidates.forEach( (candidate) => {
					if(candidate.name===candidates[i]){
						foundName=true;
						return;
					}
				})
				if(foundName===false){
					temp.push({name:candidates[i], ranking:0});
				}
			}
			this.setState({candidates:temp});
		});
	}

	//Whenever an arrow is clicked, it'll update the state to represent the new ranking
	updateRanking(candidate, newRanking) {
		this.setState({candidates:this.state.candidates.map(
			(el)=>el.name===candidate.name ? Object.assign({},el,{ranking: Number(newRanking)}) : el
		)});
		// this.refreshResults();
	}
	
	//Add a new Candidate to the table
	addCandidate(newCandidate){
		this.refreshCandidateList();

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

			web3.eth.getTransactionCount(defaultAccount.address, (err, txCount) => {
				const txObject = {
				  nonce: web3.utils.toHex(txCount),
				  gasLimit: web3.utils.toHex(7680000), 
				  gasPrice: web3.utils.toHex(web3.utils.toWei('4500000000', 'wei')),
				  to: voteContract._address,
				  data: voteContract.methods.addCandidate(newCandidate).encodeABI()
				}
		  
				const tx = NETWORK_TYPE === 'private' ? new Tx(txObject) : new Tx(txObject, { 'chain': 'ropsten' });
				tx.sign(Buffer.from(defaultAccount.privateKey.substr(2), 'hex'))
		  
				const serializedTx = tx.serialize()
				const raw = '0x' + serializedTx.toString('hex')
		  
				web3.eth.sendSignedTransaction(raw, (err, txHash) => {
					console.log('err:', err, 'txHash:', txHash)
					if (!err) {
						alert("Candidate added!");
						this.refreshResults();
					  }
				})
			})
		}
		this.refreshResults();
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
					<Button color='success' className="submitButton"onClick={ () => {this.handleSubmit()} }
					>
						Submit Vote
					</Button>

					<Button className="resultsButton" color="warning" onClick={this.toggleModal}>See Current Results</Button>
					{/* <Button className="resultsButton" color="warning" onClick={()=>{
						console.log(voteContract);
						voteContract.methods.getCandidateList().call().then( (result) => {console.log(result);});
						voteContract.methods.getAllVoterAddresses().call().then( (result) => {console.log(result);});
						voteContract.methods.getVoterInformation(defaultAccount.address).call().then((result2)=>{console.log(result2)});
					}}>Debug</Button> */}
					
					<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
						<ModalBody><WinnerResults candidates={this.state.candidates} voteResults={this.state.voteResults}/></ModalBody>
					</Modal>
				</div>
			</div>
		);
	}

	handleSubmit(){
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
				// alert("Sending your vote into the blockchain!");
				let votes=[];
				for(let i=0;i<this.state.candidates.length;i++){
					votes[this.state.candidates[i].ranking]=this.state.candidates[i].name;
				}
				votes.shift();
				for(let i=0;i<votes.length;i++){
					if(typeof votes[i]==="undefined"){
						votes.splice(i,1);
					}
				}
				console.log(votes);
				web3.eth.getTransactionCount(defaultAccount.address, (err, txCount) => {
					const txObject = {
					  nonce: web3.utils.toHex(txCount),
					  gasLimit: web3.utils.toHex(7680000), 
					  gasPrice: web3.utils.toHex(web3.utils.toWei('4500000000', 'wei')),
					  to: voteContract._address,
					  data: voteContract.methods.register(votes,this.state.hash).encodeABI()
					}
			  
					const tx = NETWORK_TYPE === 'private' ? new Tx(txObject) : new Tx(txObject, { 'chain': 'ropsten' });
					tx.sign(Buffer.from(defaultAccount.privateKey.substr(2), 'hex'))
			  
					const serializedTx = tx.serialize()
					const raw = '0x' + serializedTx.toString('hex')
			  
					web3.eth.sendSignedTransaction(raw, (err, txHash) => {
						console.log('err:', err, 'txHash:', txHash)
						if (!err) {
							alert("Your vote has been submitted!");
							this.refreshResults();
					  	}
					})
				})
			}
		}
		else{alert("Please upload your Unique Identifying Document")}
	}
}
export default App;
