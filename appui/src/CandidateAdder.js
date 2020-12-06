import React, { Component } from 'react';
import './CandidateAdder.css'
import {Button} from 'reactstrap';

export class CandidateAdder extends Component{
    constructor(props) {
        super(props)
        this.state = {newCandidate:""}
    }
	
	
	render(){
		return(
            <tr key={this.props.candidates.length}>
                <td>
                    <input
                        placeholder="Write in Candidate Here"
                        onChange={(event)=>{this.setState({newCandidate:event.target.value})}}
                        value={this.state.newCandidate}
                    />
                </td>
                <td>
                    <Button
                        color="primary"
                        onClick={()=>{
                            if(!(this.state.newCandidate === '')){
                                this.props.addCandidate(this.state.newCandidate);
                                this.setState({newCandidate:''});
                            }
                        }}
                    >
                        Add Candidate
                    </Button>
                </td>
            </tr>
		)
	} 
}

module.export = CandidateAdder;