![Build and Test](https://github.com/drphamwit/SE-SampleGithubRepo/workflows/Build%20and%20Test/badge.svg)

# Ranked Choice Voting with React and Solidity

## Introduction

Voting is a crucial part of many democratic systems, but traditional First Past the Post systems can leave many people unsatisfied. Ranked Choice Voting allows voters to rank candidates in their order of preference, and have their votes applied correspondingly.

## Features
1. Candidate Ranking and Voting
2. Adding New Candidates
    * Included to mimic the ability to Write-In Candidates as you can in the USA's elections
3. Unique Identifier Uploading
    * Intended to be representative of a fingerprint, this allows in person investigations of potential fraud
4. Live Results
    * Anyone can see the results of the election at that exact moment, until official results are processed

## Getting Started
### Installation and Setup
1. Install [Node.js](https://nodejs.org/)
2. Clones this repository and install its dependencies

		> git clone https://github.com/GaEhrlich127/Comp3800-FinalProject Ranked-Choice
		> cd Ranked-Choice
        > cd appui
		> npm install

3. Begin running the Web App

        > npm start

### Run
# To Run on the Ropsten Test Contract
1. Navigate to `appui/src/config.js`
2. On Line 7, replace `''` with your Metamask Public Key (leave the quotations)
3. On Line 8, replace `''` with your Metamask Private key - preceded by 0x (leave the quotations)

## Demo video

[A Demo of this software can be found here](https://youtu.be/iRGckt0cCNg)


## Contributors

* Gabe Ehrlich, Front End
* Rodney Chan, Back End
