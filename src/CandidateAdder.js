import React, { Component } from 'react';
import './CandidateAdder.css'

export class CandidateAdder extends Component{
    constructor(props) {
        super(props)
        this.state = {newCandidate:null}
    }
	
	
	render(){
		return(
            <tr key={this.props.candidates.length}>
                <td>
                    <input
                        placeholder="Write in Candidate Here"
                        onChange={(event)=>{this.setState({newCandidate:event.target.value})}}
                    />
                </td>
                <td>
                    <input
                        type="button"
                        value="Add Candidate"
                        onClick={()=>{
                            if(!((typeof this.state.newCandidate) == 'null')){
                                this.props.addCandidate(this.state.newCandidate);
                            }
                        }}
                    />
                </td>
            </tr>
		)
	} 
}

module.export = CandidateAdder;