import React, { Component } from 'react';
import './CandidateAdder.css'
import { WinnerTable } from './WinnerTable';
import { web3, NETWORK_TYPE, defaultAccount, voteContract } from "./config";

export class WinnerResults extends Component{
    constructor(props) {
        super(props)
        /* eliminatedCandidates =
         * {
         *  0: ['Bob Jefferson'],
         *  1: ['Elon Musk', 'Mark Zuckerberg'],
         * }
         */
        this.state = {
            eliminatedCandidates:{},
        }
    }

    /*
     * Given that voterResults is JSON
     * {voterAddress: [firstChoice, secondChoice, thirdChoice, ...]}
     *                0             1             2            n
     */
    calculateWave(voterResults, waveNumber){
        //Setup
        let currentVotes={};
        Object.entries(this.props.candidates).forEach( ([index, candidateObject]) => {
            Object.assign(currentVotes, {[candidateObject.name]:0});
        });
        Object.entries(this.state.eliminatedCandidates).forEach( ([waveEliminated, eliminations]) => {
            if(waveEliminated<waveNumber){
                for(let i=0;i<eliminations.length;i++){
                    delete currentVotes[eliminations[i]];
                }
            }
        });
        
        //Begin traversal over voters
        Object.entries(voterResults).forEach( ([address, preferences]) => {
            //console.log(`${address} ${preferences}`)
            
            //Begin Traversal over preference
            for(let currentPreference=0;currentPreference<preferences.length;currentPreference++){
                
                //Ensure current candidate is valid
                let candidateIsEliminated=false;
                Object.entries(this.state.eliminatedCandidates).forEach( ([waveEliminated, eliminations]) =>{
                    
                    //Done eliminating
                    if(waveEliminated>=waveNumber){return;}
                    
                    //Elimination found
                    if(eliminations.includes(preferences[currentPreference])){
                        candidateIsEliminated=true;
                    }
                })
                
                //Valid vote found
                if(candidateIsEliminated===false){
                    const chosenCandidate=preferences[currentPreference];
                    currentVotes=Object.assign(currentVotes, {[chosenCandidate]:currentVotes[chosenCandidate]+1});
                    return;
                }
            }
        })

        //Eliminate candidates, if not already done.
        if((typeof this.state.eliminatedCandidates[waveNumber])==="undefined"){
            let lowVote=Infinity;
            let pendingDeletion=[];
            Object.entries(currentVotes).forEach( ([candidate, voteCount]) => {
                if(voteCount===lowVote){
                    pendingDeletion.push(candidate);
                }
                else if(voteCount<lowVote){
                    lowVote=voteCount;
                    pendingDeletion=[];
                    pendingDeletion.push(candidate);
                }
            });
            this.setState({eliminatedCandidates:Object.assign(this.state.eliminatedCandidates, {[waveNumber]:pendingDeletion})})
        }
        return currentVotes;
    }
	
	render(){
                
        let i=0;
        while(Object.keys(this.calculateWave(this.props.voteResults,i)).length>0){i++;}
        let winnerTables=[];
        i=0;
        while(this.state.eliminatedCandidates[i].length>0){
            winnerTables.push(<WinnerTable waveVotes={this.calculateWave(this.props.voteResults,i)} currentWave={i} eliminatedCandidates={this.state.eliminatedCandidates[i]}/>);
            i++;
        }
		return(
            <div>
                {winnerTables}
            </div>
		)
	} 
}

module.export = WinnerResults;