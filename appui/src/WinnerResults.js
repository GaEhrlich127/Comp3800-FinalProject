import React, { Component } from 'react';
import './CandidateAdder.css'
import {Button} from 'reactstrap';

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
            test:{
                address1: ["Josh", "Max", "Jane"],
                address2:["Jane","Janet","Max","Josh"],
                address3:["Jane","Josh","Max","Janet"],
                address4:["Janet","Jane","Max","Josh"],
            }
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
            currentVotes=Object.assign(currentVotes, {[candidateObject.name]:0});
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
            console.log(`removing ${pendingDeletion}`)
            this.setState({eliminatedCandidates:Object.assign(this.state.eliminatedCandidates, {[waveNumber]:pendingDeletion})})
        }
        console.log(this.state)
        console.log(currentVotes)
    }
	
	render(){
		return(
            <div>
                <Button onClick={()=>{this.calculateWave(this.state.test,0)}}>{`Wave 0`}</Button>
                <Button onClick={()=>{this.calculateWave(this.state.test,1)}}>{`Wave 1`}</Button>
                <Button onClick={()=>{this.calculateWave(this.state.test,2)}}>{`Wave 2`}</Button>
                <Button onClick={()=>{this.calculateWave(this.state.test,3)}}>{`Wave 3`}</Button>
            </div>
		)
	} 
}

module.export = WinnerResults;

