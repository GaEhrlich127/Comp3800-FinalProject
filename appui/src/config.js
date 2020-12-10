import Web3 from 'web3';
const NETWORK_TYPE = 'live'
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/bb9b98a132ac44d08324cd0a96a4a2ea"//Replace <> with Infura Project ID
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

let defaultAccount = {
    address: '0xdE832dD0b069E0B781898A966A1c487dC781489a', // Replace with your Metamask wallet account address - or ganache address
    privateKey: '0x203bf16c865983ec12c48d6b35ab36aae4a090f34b3debd6856e5340e3c0249e' // Replace with private key of your Metamask wallet account address, prefixed with 0x
}

// Replace with vote ABI obtained by truffle console. Only the part between [] (inclusive)
let voteABI = [{"inputs":[{"internalType":"address","name":"_manager","type":"address"},{"internalType":"string[]","name":"_candidateList","type":"string[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"string[]","name":"vote","type":"string[]"},{"internalType":"string","name":"information","type":"string"}],"name":"register","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"candidateName","type":"string"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getVoterInformation","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllVoterAddresses","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCandidateList","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"}]

// Replace with contract address obtained by truffle console
let voteAddress='0xe715338eA51E0e796D329EFe2B943891572EC214';

// Initialize the vote contract with web3 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const voteContract=new web3.eth.Contract(voteABI, voteAddress)
export {web3, NETWORK_TYPE, voteContract, defaultAccount};
