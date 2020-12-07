import React, { Component } from 'react';
import {CandidateAdder} from './CandidateAdder'
import './CandidateTable.css'

export class CandidateTable extends Component{
	handleChange=(candidate, ranking)=>{
		let _candidate=candidate;
		this.props.updateRanking(_candidate, ranking)
	}

	//Check if a ranking is being reused, if it is, highlight the box in red
	determineValidity(value, name, zeroesAllowed=true){
		let validity="valid";
		this.props.candidates.forEach((candidate)=>{
			if(candidate.name===name){}
			else if (zeroesAllowed===true && value===0){validity="valid";}
			else if (candidate.ranking===value){validity="invalid";}
			else if (zeroesAllowed===false && value===0){validity="invalid";}
		})
		return validity;
	}

	render(){
		let candidateList=this.props.candidates.map((candidate,i)=>{
			return(
				<tr key={i}>
					<td>
							{candidate.name}
					</td>
					<td>
						<input 
							type="number"
							min={0}
							max={this.props.candidates.length}
							placeholder={0}
							onChange={
								(event)=>{
									this.handleChange(candidate, event.target.value)
								}
							}
							className={this.determineValidity(candidate.ranking, candidate.name, true)}
							value={candidate.ranking}
						/>
					</td>
				</tr>
			)
		})
		
		return(
			<div>
				<h3>Candidates</h3>
				<hr />
				<table className="fullTable">
					<tbody>
						<tr>
							<th>Candidate</th>
							<th>Preference</th>
						</tr>
						{candidateList}
						<CandidateAdder candidates={this.props.candidates} addCandidate={this.props.addCandidate}/>
					</tbody>
				</table>
			</div>
		)
	} 
}

module.export = CandidateTable;