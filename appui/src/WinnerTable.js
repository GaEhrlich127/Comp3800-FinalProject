import React, { Component } from 'react';
import './CandidateTable.css'

export class WinnerTable extends Component{
    constructor(props) {
		super(props)
		this.state = {
            candidateList:[],
            eliminatedString:this.props.eliminatedCandidates[0]
        }
        
        let index=0;
        Object.entries(this.props.waveVotes).forEach( ([candidate, votes]) => {
            this.state.candidateList.push(
                <tr key={index}>
                    <td>{candidate}</td>
                    <td>{votes}</td>
                </tr>
            )
            index++;
        })

        for (let i=1;i<this.props.eliminatedCandidates.length;i++){
            this.state.eliminatedString+=`, ${this.props.eliminatedCandidates[i]}`;
        }
        if(this.state.candidateList.length===1){
            this.state.eliminatedString="Nobody!";
        }
    }

	render(){
        return(
			<div>
				<h4 className="header">Elimination Cycle: {this.props.currentWave+1}</h4>
				<table className="fullTable">
					<tbody>
						<tr>
							<th>Candidate</th>
							<th>Votes</th>
						</tr>
						{this.state.candidateList}
					</tbody>
				</table>
                <h5>Eliminated: {this.state.eliminatedString}</h5>
				<hr />
			</div>
		)
	} 
}

module.export = WinnerTable;